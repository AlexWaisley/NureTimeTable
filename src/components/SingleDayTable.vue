<script setup lang="ts">
import TableInfo from '../modules/tableInfo.ts';
import Lesson from './Lesson.vue';
import { ref, defineProps, watch } from 'vue'

import { getSheduleByUnix } from '../modules/sheduleParser.ts';

const prop = defineProps({
    pickedDate: Number,
});

const todayLessons = ref<TableInfo[]>(getSheduleByUnix(prop.pickedDate));

watch(() => prop.pickedDate, () => {
    todayLessons.value = getSheduleByUnix(prop.pickedDate);
});

</script>
<template>
    <div class="lesson_container" v-for="lesson_info in todayLessons">
        <Lesson :lesson="lesson_info"> </Lesson>
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





