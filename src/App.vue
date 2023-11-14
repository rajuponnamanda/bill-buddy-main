<template>
  <div>
    <MainNavBar />
    <SecondNav />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MainNavBar from './components/MainNavBar.vue'
import SecondNav from './components/SecondNav.vue'
</script>

<style scoped></style>
