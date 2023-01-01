<script setup lang="ts">
definePageMeta({
  layout: 'install',
});

const installApp = () => {
  localStorage.setItem('installed', '1');
  navigateTo({
    path: '/app',
  });
}
</script>
<template>
  <a-result
      status="success"
      title="Application Successful Installed"
      sub-title="The application database has been setup on your local device."
  >
    <template #extra>
      <a-button key="console" v-on:click="installApp" type="primary">Go To Dashboard</a-button>
    </template>
  </a-result>
</template>
