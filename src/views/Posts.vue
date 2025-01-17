<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { httpService } from "../services/http-service";
import { CONFIG } from "../utils/config";
import { useToken } from "../composables/use-token";

const posts = ref<{ title: string; body: string; created_at: string }[]>([]);
const loading = ref(false);
const creating = ref(false);
const newPost = reactive({ title: "", body: "" });

onMounted(() => {
  fecthPosts();
});

const [authToken] = useToken(CONFIG.AUTH_TOKEN_STORAGE_KEY);

async function fecthPosts() {
  try {
    loading.value = true;
    const { data } = await httpService.requests.api.get("/posts");

    posts.value = data;
    //
  } catch (error) {
    console.error(error);
    //
  } finally {
    loading.value = false;
  }
}

async function createPost() {
  try {
    creating.value = true;
    await httpService.requests.api.post("/posts", { post: newPost });

    await fecthPosts();
    newPost.body = "";
    newPost.title = "";
    //
  } catch (error) {
    console.error(error);
    //
  } finally {
    creating.value = false;
  }
}
</script>

<template>
  <main
    class="max-w-screen-xl px-4 mx-auto py-5 posts-layout max-lg:flex max-lg:flex-col lg:grid gap-8"
  >
    <form
      class="[grid-area:aside] lg:self-start sticky top-4"
      @submit.prevent="createPost"
    >
      <h2 class="text-3xl mb-4">Add new post</h2>

      <div class="mb-5">
        <label
          for="newPost.title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Title</label
        >
        <input
          type="newPost.title"
          id="newPost.title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
          required
          :disabled="loading || creating"
          v-model="newPost.title"
        />
      </div>

      <div class="mb-5">
        <label
          for="newPost.body"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Body</label
        >
        <textarea
          type="newPost.body"
          id="newPost.body"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 h-32"
          required
          :disabled="loading || creating"
          v-model="newPost.body"
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        :disabled="loading || creating"
      >
        Add post
      </button>

      <button
        type="button"
        class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        :disabled="loading || creating"
        @click="authToken.value = '123123123123'"
      >
        Test breaking token
      </button>
    </form>

    <div
      v-if="loading && posts.length === 0"
      class="text-center [grid-area:posts]"
    >
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

    <ul class="[grid-area:posts]" :class="{ 'opacity-50': loading }">
      <li v-for="post of posts">
        <a
          href="#"
          class="mb-4 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ post.title }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ post.body }}
          </p>
        </a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.posts-layout {
  grid-template-columns: [posts-start] 1fr [posts-end aside-start] 350px [aside-end];
}
</style>
