<script setup lang="ts">
import TableInfo from '../modules/tableInfo.ts';
import linksConnectData from '../data/linkConnect.json';
import linksCheckoutData from '../data/linkCheckout.json';
const linkConnectDictionary = ref<Record<string, string>>(linksConnectData._value);
const linkCheckoutDictionary = ref<Record<string, string>>(linksCheckoutData._value);

import { ref, defineProps } from 'vue'


const properti = defineProps({
    todayLessons: Array<TableInfo>,
    dateInfo: Date
});
const currDayShedule = ref<TableInfo[]>([]);
const currWeekDay = ref("");

try {
    if (properti.todayLessons === undefined) {
        throw new Error('Today Lessons in dailySheduleSidebar is undefined');
    }
    if (properti.dateInfo === undefined) {
        throw new Error('Date info in dailySheduleSidebar is undefined');
    }
    currDayShedule.value = properti.todayLessons;
    currWeekDay.value = properti.dateInfo.toLocaleDateString('en-Us', { weekday: "long" });
} catch (error) {
    console.log(error);
}

const getLink = (key: TableInfo, type: DictionaryDestiny): string => {
    switch (type) {
        case DictionaryDestiny.LINK_CONNECT:
            return linkConnectDictionary.value[key.Theme + ' ' + key.Type];
        case DictionaryDestiny.LINK_CHECKOUT:
            return linkCheckoutDictionary.value[key.Theme + ' ' + key.Type];
        default:
            console.log("Type is not found");
            return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
};

enum DictionaryDestiny {
    LINK_CONNECT,
    LINK_CHECKOUT
}

</script>
<template>
    <span>Today: {{ currWeekDay }}</span>
    <div class="lesson_list" v-for="lesson in todayLessons">
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





