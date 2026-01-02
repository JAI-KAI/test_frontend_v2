<template>
  <NuxtLoadingIndicator color="green" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const theme = 'dark'
provide('theme', theme)
</script>
