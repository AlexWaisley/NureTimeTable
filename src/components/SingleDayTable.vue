<script setup lang="ts">
import TableInfo from '../modules/tableInfo.ts';
import Lesson from './Lesson.vue';
import { ref, watch } from 'vue'

import { getSheduleByUnix } from '../modules/sheduleParser.ts';
import { useDateStore } from "../stores/date.ts";
const storeDate = useDateStore();
const todayLessons = ref<TableInfo[]>(getSheduleByUnix(storeDate.date));

watch(() => storeDate.date, (newVal) => {
    todayLessons.value = getSheduleByUnix(newVal);
});

</script>
<template>
    <div class="day_lessons_container">
        <Lesson v-for="lesson_info in todayLessons" :lesson="lesson_info"> </Lesson>
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





