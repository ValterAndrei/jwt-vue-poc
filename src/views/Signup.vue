<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuth } from "../composables/use-auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuth();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);

async function handleSubmit() {
  try {
    loading.value = true;

    await auth.signup(form);

    router.push({ name: "dashboard" });
    //
  } catch (error) {
    console.error(error.response);
    //
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="max-w-sm mx-auto py-5 px-4">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl"
    >
      Signup
    </h1>

    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60"
          placeholder="name@flowbite.com"
          required
          :disabled="loading"
          v-model="form.email"
        />
      </div>

      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60"
          required
          :disabled="loading"
          v-model="form.password"
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-60"
        :disabled="loading"
      >
        Submit
      </button>
    </form>

    <div
      v-if="auth.errorRef"
      id="alert-border-2"
      class="mt-4 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <svg
        class="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>

      <div class="ms-3 text-sm font-medium">{{ auth.errorRef }}</div>
    </div>
  </main>
</template>
