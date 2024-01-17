<script setup lang="ts">
import { Lesson } from '../models';

import LessonComponent from './Lesson.vue';
import { ref, watch, onMounted } from 'vue'

import { useGeneralStore } from '../stores/generalInfo';
import { useTableDataStore } from '../stores/tableData';
const generalStore = useGeneralStore();
const tableData = useTableDataStore();

const todayLessons = ref<Lesson[]>([]);

onMounted(async () => {
    todayLessons.value = await tableData.getSheduleForDay(generalStore.Date);
});

watch(() => generalStore.IsUpdated, async () => {
    todayLessons.value = await tableData.getSheduleForDay(generalStore.Date);
});

</script>
<template>
    <div class="day_lessons_container">
        <LessonComponent v-for="lesson_info in todayLessons" :lesson="lesson_info"> </LessonComponent>
    </div>
</template>
<style scoped>
.day_lessons_container {
    display: grid;
    gap: 0.9rem;
    height: 90%;
    grid-template-rows: repeat(6, 1fr);
    padding: 0 5px;
    transition: all .5s ease;
    opacity: 0;
}

@media screen and (min-width:590px) {
    .day_lessons_container {
        min-width: 550px;
    }
}
</style>





