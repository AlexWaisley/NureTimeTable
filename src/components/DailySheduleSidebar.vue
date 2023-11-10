<script setup lang="ts">
import TableInfo from '../modules/tableInfo.ts';
import { currentDate, DictionaryDestiny } from '../modules/dataParser.ts'
import { getSheduleByDateWithoutEmpty, getLink } from '../modules/sheduleParser.ts'

import { ref } from 'vue'

const currDayShedule = ref<TableInfo[]>(getSheduleByDateWithoutEmpty(currentDate));
const currWeekDay = ref(currentDate.toLocaleDateString('en-Us', { weekday: "long" }));

</script>
<template>
    <span>Today: {{ currWeekDay }}</span>
    <div class="lesson_list" v-for="lesson in currDayShedule">
        <hr>
        <span class="lesson_list_text">{{ lesson.StartTime }}</span>
        <br>
        <hr>
        <span class="lesson_list_text">{{ lesson.Theme }}</span>
        <br>
        <br>
        <span class="lesson_list_text">{{ lesson.Type }}</span>
        <br>
        <br>
        <a :href="getLink(lesson, DictionaryDestiny.LINK_CONNECT)" target="_blank" class="lesson_list_text">Connect</a>
        <br>
        <br>
        <a :href="getLink(lesson, DictionaryDestiny.LINK_CHECKOUT)" target="_blank" class="lesson_list_text">Checkout</a>
    </div>
</template>
<style scoped></style>





