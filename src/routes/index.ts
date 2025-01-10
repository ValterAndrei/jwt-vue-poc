import { createMemoryHistory, createRouter, type RouteRecordRaw } from "vue-router"

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/dashboard",
        component: Dashboard,
    },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})