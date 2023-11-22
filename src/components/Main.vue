<script setup lang="ts">

import DailySheduleSidebar from './DailySheduleSidebar.vue';
import Table from './Table.vue';

import { defineProps, ref, watch } from 'vue';

/* const changeDay = (period: number) => {
    if (!tableViewDay.value) {
        period *= 7;
    }
    date.value?.setDate(date.value.getDate() + period);
    updateUnixTimestamp();
}; */

const updateUnixTimestamp = () => {
    if (date.value !== undefined) {
        unixTimestamp.value = Math.floor(date.value.getTime() / 1000);
    }
}

watch(() => properti.tableViewDay, (newVal) => { tableViewDay.value = newVal })

const properti = defineProps({
    tableViewDay: Boolean,
    allLessons: Array,
    dateInfo: Date
});

const tableViewDay = ref(properti.tableViewDay);
const date = ref(properti.dateInfo);
const unixTimestamp = ref<number>();

updateUnixTimestamp();

</script>
<template>
    <div class="main">
        <DailySheduleSidebar></DailySheduleSidebar>

        <Table :table-view-day="tableViewDay" :picked-date="unixTimestamp"></Table>

        <!-- <div class="switcher">
            <button @click="changeDay(-1)"><span>prev</span></button>
            <button @click="changeDay(1)"><span>next</span></button>
        </div> -->



        <!-- //TODO: Move btns to header -->



    </div>
</template>
<style scoped>
.main {
    display: grid;
    height: 100%;
    gap: 0.5rem;
}

@media screen and (min-width:590px) {
    .main {
        grid-template-columns: 270px 1fr;
        overflow-y: auto;
    }
}
</style>





