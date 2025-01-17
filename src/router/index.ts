import { createRouter, createWebHistory } from "vue-router"
import { useAuth } from "../composables/use-auth"
import { routes } from "./routes"

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const auth = useAuth()

    if (!auth.firstLoading && to.name !== "login") {
        // INFO: Mostra login na tentativa de auth por localstorage token
        return {
            name: 'login',
            query: { redirect: to.fullPath },
        }
    }

    if (to.meta.auth === 'authenticated' && !auth.isLoggedIn) {
        // INFO: Mostra login ao entrar em rotas protegidas deslogado
        return {
            name: 'login',
            query: { redirect: to.fullPath },
        }
    }

    if (to.meta.auth === 'visitor' && auth.isLoggedIn) {
        // INFO: Redireciona para dashboard ao tentar acessar paginas de visitante logado
        return { name: 'dashboard' }
    }
})

export { router }