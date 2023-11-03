<script setup lang="ts">
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import { ref } from 'vue';
import Lesson from './modules/lesson.ts'
import data from './Table.json';

let displayDay = ref(true);
const lessonList = ref<Lesson[]>(data.lessons);

const currDate = new Date();
const currMonthLongName = currDate.toLocaleString('en-us', { month: 'long' });
const formattedString = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  .format(currDate)
  .split('/')
  .join('.');

const currLessons = lessonList.value.filter(x => x.StartDate === formattedString);

let dateString = `${currDate.getDate()}  ${currMonthLongName}  ${currDate.getFullYear()}`;

let changeDisplaying = () => {
  displayDay.value = !displayDay.value;
};
</script>

<template>
  <Header @change-displaying="changeDisplaying" :date-string="dateString" :table-view-day="displayDay"></Header>
  <Table :dateInfo="currDate" :table-view-day="displayDay" :todayLessons="currLessons" :allLessons="lessonList"></Table>
</template>

<style scoped></style>
