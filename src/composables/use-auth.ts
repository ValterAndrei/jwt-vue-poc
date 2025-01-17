import axios from "axios"
import { defineStore } from "pinia"
import { computed, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router";

import { httpService } from "../services/http-service";
import { CONFIG } from "../utils/config";
import { useToken } from "./use-token";

type User = { email: String; id: number }

export const useAuth = defineStore('auth', () => {
    const router = useRouter()
    const [authToken, authTokenExpired] = useToken(CONFIG.AUTH_TOKEN_STORAGE_KEY)

    const user = ref<User | null>(null)
    const firstLoading = ref(false)
    const errorRef = ref<string | null>(null)

    const isLoggedIn = computed(() => Boolean(user.value))
    const userName = computed(() => user.value?.email?.split("@")[0] || "")

    onMounted(() => {
        const token = localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)

        if (token) fetchUser()
        else firstLoading.value = true
    })

    watch(() => authToken.value, newValue => {
        // INFO: token expirado/apagado, desloga usuario
        if (!newValue) {
            user.value = null
        }
    })

    watch(isLoggedIn, newValue => {
        // INFO: usuario deslogado, redireciona para login
        if (!newValue) router.push({
            name: "login",
            ...(authTokenExpired.value
                ? {
                    query: {
                        redirect: router.currentRoute.value.path,
                        error: "token-expired"
                    }
                }
                : {}),
        })
    })

    async function login(credentials: { email: string, password: string }) {
        try {
            const { data } = await httpService.auth.login(credentials);

            errorRef.value = null;
            user.value = data.user;
            //
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorRef.value = error.response?.data?.error as string || "An error occurred";
            } else {
                errorRef.value = "An error occurred";
            }

            return await Promise.reject(error);
        }
    }

    async function signup(credentials: { email: string, password: string }) {
        try {
            const { data } = await httpService.auth.signup(credentials);

            errorRef.value = null;
            user.value = data.user;
            //
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorRef.value = error.response?.data?.messages?.[0] as string || "An error occurred";
            } else {
                errorRef.value = "An error occurred";
            }

            return await Promise.reject(error);
        }
    }

    function logout() {
        const request = httpService.auth.logout()
            .catch(async (error) => await Promise.reject(error))

        user.value = null

        return request
    }

    async function fetchUser() {
        try {
            const { data } = await httpService.auth.fetchUser()

            errorRef.value = null

            user.value = data.user
            //
        } catch (error) {
            user.value = null

            errorRef.value = "Login expired, please log in again"
            //
        } finally {
            firstLoading.value = true
        }
    }

    return {
        user,
        isLoggedIn,
        userName,
        firstLoading,
        errorRef,
        login,
        logout,
        signup,
    }
})