<script setup lang="ts">
import Lesson from './Lesson.vue';
import { defineProps, ref, watch } from 'vue'
let properti = defineProps({
    tableViewDay: Boolean
});
const tableViewDay = ref(properti.tableViewDay);

watch(tableViewDay, (newVal) => {
    console.log(newVal);
});
let lessons = new Array(6);
</script>
<template>
    <div class="main">
        <aside class="current_day_info">
            <span>Current weekday</span>
            <div class="lesson_list" v-for="_ in lessons">
                <hr>
                <span class="lesson_list_text">Time</span>
                <br>
                <span class="lesson_list_text">Name</span>
                <br>
                <span class="lesson_list_text">Type</span>
                <br>
                <a href="https://www.youtube.com/watch?v=ohD7dOXQH-U" class="lesson_list_text">Link</a>
            </div>
        </aside>
        <div class="table_container">
            <div v-if="properti.tableViewDay" class="day">
                <div class="lesson_container" v-for="_ in lessons">
                    <Lesson></Lesson>
                </div>
            </div>
            <div v-else class="week">
                <div class="week__day" v-for="_ in 7">
                    <span>30 october Monday</span>
                    <div class="lesson_container" v-for="_ in lessons">
                        <Lesson></Lesson>
                    </div>
                </div>
            </div>
        </div>
        <div class="switcher">
            <button><span>prev</span></button>
            <button><span>next</span></button>
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
    width: 7rem;
    height: 38rem;
    max-height: 90%;
    background-color: #fff;
    display: flex;
    align-items: center;
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
    max-width: 100%;
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




/*
time:
7:45 - 9:20 
9:30 - 11:05 
11:15 - 12:50 
13:10 - 14:45 
14:55 - 16:30 
16:40 - 18:15 
*/ 
