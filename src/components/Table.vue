<script setup lang="ts">
import LessonClass from '../modules/lesson.ts';
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import TableInfo from '../modules/tableInfo.ts';
import { defineProps } from 'vue'

const properti = defineProps({
    tableViewDay: Boolean,
    todayLessons: Array,
    allLessons: Array,
    dateInfo: Date
});

</script>
<template>
    <div class="table_container">
        <div v-if="properti.tableViewDay" class="day">
            <DayTable></DayTable>
        </div>
        <div v-else class="week">
            <WeekTable></WeekTable>
        </div>
    </div>
</template>
<style scoped>
.table_container {
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
}

.day {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    max-height: 100%;
    width: 80%;
}

.week {
    margin-left: 15%;
    padding-top: 1rem;
    display: flex;
    gap: 4rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-height: 100%;
}
</style>





