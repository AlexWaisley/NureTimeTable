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
    <div class="table_container">
        <DayTable v-if="properti.tableViewDay" :picked-date="properti.pickedDate"></DayTable>
        <WeekTable v-else :picked-date="properti.pickedDate"></WeekTable>
    </div>
</template>

<style scoped>
.table_container {
    display: grid;
    margin: 1rem;
}

@media screen and (min-width:590px) {
    .table_container {
        overflow-y: auto;
    }
}
</style>





