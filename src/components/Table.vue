<script setup lang="ts">
import Lesson from './lesson.vue';

let lessons = new Array(6);
</script>
<template>
    <div class="main">
        <div class="day">
            <div class="lesson_container" v-for="_ in lessons">
                <Lesson></Lesson>
            </div>
        </div>
    </div>
</template>
<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
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
    width: 95%;
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
