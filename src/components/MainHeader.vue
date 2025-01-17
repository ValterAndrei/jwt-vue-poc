<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/use-auth";

const auth = useAuth();

const open = ref(false);
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <RouterLink
        to="/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >JWT-POC</span
        >
      </RouterLink>

      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span class="sr-only">Open main menu</span>

        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <div
        id="navbar-default"
        class="w-full md:block md:w-auto"
        :class="{ hidden: !open }"
      >
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <template v-if="!auth.isLoggedIn">
            <li>
              <RouterLink
                :to="{ name: 'login' }"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Login
              </RouterLink>
            </li>

            <li>
              <RouterLink
                :to="{ name: 'signup' }"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Signup
              </RouterLink>
            </li>
          </template>

          <template v-else>
            <li>
              <RouterLink
                to="/dashboard"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Dashboard
              </RouterLink>
            </li>

            <li>
              <div class="grid gap-1 justify-items-end">
                <p>Hi, {{ auth.userName }}</p>

                <button
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  @click="auth.logout"
                >
                  Logout
                </button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
