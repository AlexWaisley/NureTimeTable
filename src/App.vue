<script setup lang="ts">
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";

import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

</script>

<template>
  <Header></Header>
  <Main></Main>
</template>

<style scoped></style>
