<script setup lang="ts">
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import { useTableDataStore } from './stores/tableData';

const tableStore = useTableDataStore();
</script>

<template>
  <Header v-if="tableStore.isReady"></Header>
  <Main v-if="tableStore.isReady"></Main>
</template>
