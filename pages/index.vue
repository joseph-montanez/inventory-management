<script setup lang="ts">
// import { onMounted } from 'vue'

const router = useRouter();

definePageMeta({
  layout: 'default',
});

onMounted(() => {
  const isInstalled = localStorage.getItem('installed') ? true : false;
  if (isInstalled) {
    navigateTo({
      path: '/app',
    });
  } else {
    navigateTo({
      path: '/install',
    });
  }
});
</script>
<template>
  <NuxtLink to="/install">Install</NuxtLink>
  <NuxtLink to="/app">App</NuxtLink>
  Index Here!
</template>
<style>
</style>
