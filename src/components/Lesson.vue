<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue';
import TableInfo from '../modules/tableInfo.ts';

const properti = defineProps({
    lesson: TableInfo,
});

const thisLesson = ref<TableInfo>(new TableInfo());

try {
    if (properti.lesson !== undefined) {
        thisLesson.value = properti.lesson;

        watchEffect(() => {
            if (properti.lesson !== undefined) {
                thisLesson.value = properti.lesson;
            }
        });
    }
    else {
        throw new Error("Lesson properti in lesson component is undefined");
    }
} catch (error) {
    console.log(error);
}


</script>
<template>
    <div class="lesson">
        <div class="lesson__time">
            <div class="lesson__time-start">{{ thisLesson.StartTime }}</div>
            <div class="lesson__time-end">{{ thisLesson.EndTime }}</div>
        </div>
        <hr>
        <div class="lesson__name">{{ thisLesson.Theme }}</div>
        <hr>
        <div class="lesson__type">{{ thisLesson.Type }}</div>
        <hr>
        <div class="lesson__room">{{ thisLesson.Room }}</div>
    </div>
</template>

<style scoped>
.lesson {
    display: flex;
    flex-direction: row;
    gap: .3rem;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    padding: 5px .7rem;
    font-size: 1.25rem;
    font-weight: 500;
    width: 100%;
}

.lesson__time {
    flex: 1;
}

.lesson__name {
    flex: 2;
}

.lesson__type {
    flex: 2;
}

.lesson__room {
    flex: 1;
}

hr {
    height: 100%
}
</style>