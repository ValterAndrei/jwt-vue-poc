<script setup lang="ts">
import { useAuth } from "../composables/use-auth";

const auth = useAuth();
</script>

<template>
  <div class="max-w-screen-xl px-4 mx-auto py-5">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl"
    >
      Dashboard
    </h1>

    <p class="mb-4">
      Welcome, <strong class="font-bold">{{ auth.userName }}</strong>
      . Access you content below:
    </p>

    <ul class="flex">
      <li>
        <RouterLink
          to="/posts"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >Posts</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
