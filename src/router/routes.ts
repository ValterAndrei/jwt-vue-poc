import type { RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import Posts from "../views/Posts.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            auth: "visitor",
        },
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup,
        meta: {
            auth: "visitor",
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
            auth: "authenticated"
        }
    },
    {
        path: "/posts",
        name: "posts",
        component: Posts,
        meta: {
            auth: "authenticated"
        }
    },
]