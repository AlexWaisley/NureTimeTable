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
    <div class="lesson_container">
        <Lesson v-for="lesson_info in todayLessons" :lesson="lesson_info"> </Lesson>
    </div>
</template>
<style scoped>
.lesson_container {
    display: grid;
    gap: 0.9rem;
    height: 90%;
    grid-template-rows: repeat(6, 1fr);
    padding: 0 5px;
}

@media screen and (min-width:590px) {
    .lesson_container {
        min-width: 550px;
    }
}
</style>





