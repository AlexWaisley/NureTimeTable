<script setup lang="ts">
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import { ref } from 'vue';
let displayDay = ref(true);

let changeDisplaying = () => {
  displayDay.value = !displayDay.value;
  console.log("CUM");
};
</script>

<template>
  <Header @change-displaying="changeDisplaying"></Header>
  <Table :table-view-day="displayDay"></Table>
</template>

<style scoped></style>
