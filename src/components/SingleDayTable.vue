<script setup lang="ts">
import LessonComponent from './Lesson.vue';
import { useTableDataStore } from '../stores/tableData';

const tableDataStore = useTableDataStore();

</script>
<template>
    <div class="day_lessons_container">
        <LessonComponent v-for="lesson_info in tableDataStore.tableForSelectedDate" :lesson="lesson_info">
        </LessonComponent>
    </div>
</template>
<style lang="scss" scoped>
@use '../styles/mixin' as mixin;

.day_lessons_container {
    @include mixin.tableContainerBase;
    grid-template-rows: repeat(6, 1fr);
}
</style>





