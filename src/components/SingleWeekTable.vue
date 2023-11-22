<script setup lang="ts">
import Lesson from './Lesson.vue';
import { defineProps, watch } from 'vue'

import { getSheduleForWeek } from "../modules/sheduleParser.ts";
import { weekDaysList } from "../modules/dataParser.ts";


const prop = defineProps({
    pickedDate: Number,
});

let sheduleForWeek = getSheduleForWeek(prop.pickedDate);


watch(() => prop.pickedDate, (newVal) => {
    sheduleForWeek = getSheduleForWeek(newVal);
})

</script>
<template>
    <div class="week__container">
        <div class="weekday__container" v-for="(day, index) in weekDaysList">
            <span class="weekday__text">{{ day }}</span>
            <div class="lesson_container" v-for="lessonInfo in sheduleForWeek[index]">
                <Lesson :lesson="lessonInfo"></Lesson>
            </div>
        </div>
    </div>
</template>
<style scoped>
.week__container {
    display: grid;
    gap: 3rem;
}

@media screen and (min-width:1400px) {
    .week__container {
        grid-template-columns: repeat(2, 1fr);
    }
}

.weekday__text {
    font-weight: 700;
    font-size: 1.5rem;
    color: #4F378B;
}

.weekday__container {
    display: grid;
    gap: 0.9rem;
    grid-template-rows: repeat(7, 1fr);
    padding: 5px;
    text-align: center;
    align-items: center;
    transition: all .5s ease;
    background-color: #D0BCFF;
    border-radius: 10px;
    box-shadow: 1.5px 1.5px 1.5px rgba(33, 0, 93, 0.34)
}
</style>





