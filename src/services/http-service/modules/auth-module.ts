import axios from "axios"

import type { Interceptor } from "../interceptors/types"

import { useToken } from "../../../composables/use-token"
import { CONFIG } from "../../../utils/config"

const [authToken, authTokenExpired] = useToken(CONFIG.AUTH_TOKEN_STORAGE_KEY)

export class AuthModule {
    #api = axios.create({ baseURL: import.meta.env.VITE_AUTH_BASE_URL })

    constructor(interceptors: Interceptor[] = []) {
        interceptors.forEach(Interceptor => new Interceptor(this.#api).install())
    }

    async login(credentials: { email: string, password: string }) {
        try {
            const response = await this.#api.post("/login", {
                user: credentials
            })

            const token = response.headers["authorization"].split(" ")[1]

            authToken.value = token

            return response
            //
        } catch (error) {
            return await Promise.reject(error)
        }
    }

    async signup(credentials: { email: string, password: string }) {
        try {
            const response = await this.#api.post("/signup", {
                user: credentials
            })

            const token = response.headers["authorization"].split(" ")[1]

            authToken.value = token

            return response
            //
        } catch (error) {
            return await Promise.reject(error)
        }
    }

    async logout() {
        try {
            const token = authToken.value

            authToken.value = null
            authTokenExpired.value = false

            await this.#api.delete("/logout", {
                headers: { Authorization: `Bearer ${token}` }
            })

            //
        } catch (error) {
            return await Promise.reject(error)
        }
    }

    async fetchUser() {
        try {
            if (!authToken.value) return await Promise.reject("AuthService: Not logged in")

            const response = await this.#api.get("/current_user")

            return response
            //
        } catch (error) {
            return await Promise.reject(error)
        }
    }
}