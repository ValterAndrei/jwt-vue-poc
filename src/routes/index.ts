import { createMemoryHistory, createRouter, type RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Home,
    }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})