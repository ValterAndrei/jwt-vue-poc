<script setup lang="ts">
import MainHeader from "./components/MainHeader.vue";
import { useAuth } from "./composables/use-auth";

// Initializa autenticação em caso de presença de token
useAuth();
</script>

<template>
  <MainHeader />

  <RouterView />
</template>
