<script setup lang="ts">
import Lesson from './Lesson.vue';
import { defineProps } from 'vue'

const properti = defineProps({
    tableViewDay: Boolean,
    todayLessons: Array,
    allLessons: Array,
    dateInfo: Date
});

</script>
<template>
    <div class="day">
        <div class="lesson_container" v-for="_ in 7">
            <!-- <Lesson :start-time-p="lesson_info.StartTime" :end-time-p="lesson_info.EndTime" :theme-p="lesson_info.Theme"
                :type-p="lesson_info.Type" :room-p="lesson_info.Room">
            </Lesson> -->
        </div>
    </div>
</template>
<style scoped>
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
</style>





