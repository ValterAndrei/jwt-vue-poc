<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useAuth } from "../composables/use-auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuth();

const loading = ref(false);
const localError = ref("");
const form = reactive({
  email: "",
  password: "",
});

const errorMessage = computed(() => localError.value || auth.errorRef || '')

watch(
  () => auth.firstLoading,
  (newValue) => {
    if (!newValue) return;

    if (auth.isLoggedIn) redirectPostLogin();
  }
);

onMounted(() => {
  if (router.currentRoute.value.query.error === "token-expired")
    localError.value = "Login expired, please log in again";
});

async function handleSubmit() {
  try {
    loading.value = true;

    await auth.login(form);

    redirectPostLogin();

    //
  } catch (error) {
    // @ts-ignore
    console.error(error.response);
    //
  } finally {
    loading.value = false;
    localError.value = ''
  }
}

function redirectPostLogin() {
  const { redirect } = router.currentRoute.value.query;

  const redirectString = Array.isArray(redirect) ? redirect[0] : redirect;

  router.push(redirectString || "/dashboard");
}
</script>

<template>
  <main class="max-w-sm mx-auto py-5 px-4">
    <div v-if="!auth.firstLoading" class="text-center">
      <div role="status">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <template v-else>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl"
      >
        Login
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
        v-if="errorMessage"
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

        <div class="ms-3 text-sm font-medium">{{ errorMessage }}</div>
      </div>
    </template>
  </main>
</template>
