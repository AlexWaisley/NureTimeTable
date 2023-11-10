<script setup lang="ts">
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import { defineProps } from 'vue'

const properti = defineProps({
    tableViewDay: Boolean,
    pickedDate: Number,
});

</script>

<template>
    <div v-if="properti.tableViewDay" class="day">
        <DayTable :picked-date="properti.pickedDate"></DayTable>
    </div>
    <div v-else class="week">
        <WeekTable :picked-date="properti.pickedDate"></WeekTable>
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





