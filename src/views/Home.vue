<template>
  <div class="max-w-screen-xl px-4 mx-auto py-5">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl"
    >
      POC - vue 3 c/ JWT
    </h1>

    <p class="mb-5">
      Nessa aplicação, é apresentado um estilo de autenticação para VUe 3 usando
      JWT. Aqui você vai encontrar as páginas:
    </p>

    <ul
      class="space-y-3 text-gray-500 list-disc list-inside dark:text-gray-400"
    >
      <li>
        Home:
        <code
          class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          >/</code
        >
        - Página de entrada, acessível a todos
      </li>

      <li>
        Login:
        <code
          class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          >/login</code
        >
        - Pagina para efetuar login
      </li>

      <li>
        Signup:
        <code
          class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          >/signup</code
        >
        - Pagina para efetuar login
      </li>

      <li>
        Dashboard:
        <code
          class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          >/dashboard</code
        >
        - possível acessar apenas com autenticação
      </li>

      <li>
        Posts:
        <code
          class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          >/posts</code
        >
        - possível acessar e interagir apenas com autenticação
      </li>
    </ul>
  </div>
</template>
