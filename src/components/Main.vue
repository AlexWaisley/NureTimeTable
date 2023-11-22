<script setup lang="ts">

import DailySheduleSidebar from './DailySheduleSidebar.vue';
import Table from './Table.vue';

import { defineProps, ref, watch } from 'vue';

watch(() => properti.tableViewDay, (newVal) => { tableViewDay.value = newVal })

const properti = defineProps({
    tableViewDay: Boolean,
    allLessons: Array,
    dateInfo: Date
});

const tableViewDay = ref(properti.tableViewDay);
</script>
<template>
    <div class="main">
        <DailySheduleSidebar></DailySheduleSidebar>
        <Table :table-view-day="tableViewDay"></Table>
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





