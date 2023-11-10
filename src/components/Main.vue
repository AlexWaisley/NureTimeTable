<script setup lang="ts">

import DailySheduleSidebar from './DailySheduleSidebar.vue';
import Table from './Table.vue';

import { defineProps, ref, watch } from 'vue';

const changeDay = (period: number) => {
    if (!tableViewDay.value) {
        period *= 7;
    }
    date.value?.setDate(date.value.getDate() + period);
    updateUnixTimestamp();
};

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
        <aside class="current_day_info">
            <DailySheduleSidebar></DailySheduleSidebar>
        </aside>
        <div class="table_container">
            <Table :table-view-day="tableViewDay" :picked-date="unixTimestamp"></Table>
        </div>
        <div class="switcher">
            <span>Date:</span>
            <span>{{ Intl.DateTimeFormat('ko-KR', {
                day: '2-digit', month: '2-digit', year: '2-digit'
            }).format(date) }}</span>
            <button @click="changeDay(-1)"><span>prev</span></button>
            <button @click="changeDay(1)"><span>next</span></button>
        </div>
    </div>
</template>
<style scoped>
.switcher {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    flex-direction: column;
    gap: 1rem;
}

.current_day_info {
    width: 9rem;
    height: 38rem;
    max-height: 90%;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 1rem;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    overflow-y: auto;
}

hr {
    width: 100%;
}

.table_container {
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
}

.main {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    max-height: 100%;
    gap: 0.5rem;
}

.day {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    max-height: 100%;
    width: 80%;
}

.lesson_container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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

.week__day {
    flex: 1;
    max-width: 550px;
    padding: .5rem;
    background-color: #e2e2e2;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

}
</style>





