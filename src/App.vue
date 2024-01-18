<script setup lang="ts">
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia';
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
import { useTableDataStore } from './stores/tableData';
const tableStore = useTableDataStore();

</script>

<template>
  <Header></Header>
  <Main></Main>
</template>

<style scoped></style>
