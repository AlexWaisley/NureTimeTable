<script setup lang="ts">
import LessonComponent from './Lesson.vue';
import { useTableDataStore } from '../stores/tableData';

import { weekDaysList } from "../stores/tableStaticInfo.ts";
const tableDataStore = useTableDataStore();

</script>
<template>
    <div class="week__container">
        <div class="weekday__container" v-for="(day, index) in weekDaysList">
            <span class="weekday__text">{{ day }}</span>
            <div class="lesson_container" v-for="lessonInfo in tableDataStore.tableForSelectedWeekDate[index]">
                <LessonComponent :lesson="lessonInfo"></LessonComponent>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../styles/mixin' as mixin;
@use '../styles/variables' as variables;

.week__container {
    display: grid;
    gap: 3rem;

    @media screen and (min-width:1400px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

.weekday__text {
    @include mixin.dayOfWeekNameStyle();
}

.weekday__container {
    @include mixin.tableContainerBase;
    @include mixin.gridCenterText;
    @include mixin.standartBorderShadow;
    align-items: center;
    padding: 5px;
    grid-template-rows: repeat(7, 1fr);
    background-color: variables.$week-day-container-bg-color;
}
</style>