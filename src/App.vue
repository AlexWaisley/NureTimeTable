<script setup lang="ts">
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";

import Lesson from './modules/lesson.ts'

import shedule from './data/Table.json';

import { ref } from 'vue';

import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const lessonList = ref<Lesson[]>(shedule.lessons);

const displayDay = ref(true);
const currDate = new Date();

const changeDisplaying = () => {
  displayDay.value = !displayDay.value;
};

</script>

<template>
  <Header @change-displaying="changeDisplaying" :curr-date="currDate" :table-view-day="displayDay"></Header>
  <Main :dateInfo="currDate" :allLessons="lessonList" :table-view-day="displayDay"></Main>
</template>

<style scoped></style>
