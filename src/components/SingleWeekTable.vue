<script setup lang="ts">
import Lesson from './Lesson.vue';
import { defineProps, watch } from 'vue'

import { getSheduleForWeek } from "../modules/sheduleParser.ts";


const prop = defineProps({
    pickedDate: Number,
});

let sheduleForWeek = getSheduleForWeek(prop.pickedDate);


watch(() => prop.pickedDate, (newVal) => {
    sheduleForWeek = getSheduleForWeek(newVal);
})

</script>
<template>
    <div class="week">
        <div class="week__day" v-for="dayLessons in sheduleForWeek">
            <span>CUM</span>
            <div class="lesson_container" v-for="lessonInfo in dayLessons">
                <Lesson :lesson="lessonInfo"></Lesson>
            </div>
        </div>
    </div>
</template>
<style scoped>
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





