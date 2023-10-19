<script setup lang="ts">
import Lesson from './Lesson.vue';

let lessons = new Array(6);
</script>
<template>
    <div class="main">
        <!-- <div class="day">
            <div class="lesson_container" v-for="_ in lessons">
                <Lesson></Lesson>
            </div>
        </div> -->
        <div class="week">
            <div class="week__day" v-for="_ in 7">
                <div class="lesson_container" v-for="_ in lessons">
                    <Lesson></Lesson>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.main {
    display: flex;
    overflow-y: auto;
    padding: 10px;
    justify-content: center;
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
    max-width: 100%;
}

.week {
    padding-top: 1rem;
    display: flex;
    gap: 4rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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




/*
time:
7:45 - 9:20 
9:30 - 11:05 
11:15 - 12:50 
13:10 - 14:45 
14:55 - 16:30 
16:40 - 18:15 
*/ 
