<script setup lang="ts">
import TableInfo from '../modules/tableInfo.ts';
import { DictionaryDestiny } from "../modules/additionalTypes.ts";

import { useTableDataStore } from '../stores/tableData.ts'
import { useDateStore } from "../stores/date.ts";

import { ref } from 'vue'

const dateStore = useDateStore();
const tableDataStore = useTableDataStore();

const getSheduleByDateWithoutEmpty = tableDataStore.getSheduleByDateWithoutEmpty;
const getLink = tableDataStore.getLink;


const currDay = ref(dateStore.CurrentDate.toLocaleDateString('en-Us', { day: "2-digit", month: "long" }));
const currWeekDay = ref(dateStore.CurrentDate.toLocaleDateString('en-Us', { weekday: "long" }));
const currDayShedule = ref<TableInfo[]>(getSheduleByDateWithoutEmpty(dateStore.CurrentDate));

</script>
<template>
    <div class="current_day_info">
        <div class="day__data">
            <span class="current__weekday">{{ currDay }}</span>
            <br>
            <br>
            <span class="current__weekday">{{ currWeekDay }}</span>
        </div>

        <div class="lesson_list" v-for="lesson in currDayShedule">
            <hr>
            <span class="lesson_list_text">{{ lesson.StartTime }}</span>
            <br>
            <br>
            <span class="lesson_list_text">{{ lesson.Theme }}</span>
            <br>
            <br>
            <span class="lesson_list_text">{{ lesson.Type }}</span>
            <br>
            <br>
            <a :href="getLink(lesson, DictionaryDestiny.LINK_CONNECT)" target="_blank" class="lesson_list_text">Connect</a>
            <br>
            <br>
            <a :href="getLink(lesson, DictionaryDestiny.LINK_CHECKOUT)" target="_blank"
                class="lesson_list_text">Checkout</a>
        </div>
    </div>
</template>
<style scoped>
.current_day_info {
    background-color: #EADDFF;
    display: grid;
    text-align: center;
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    color: #21005D;
    box-shadow: 2px 2px 2px rgba(33, 0, 93, 0.40)
}

@media screen and (min-width:590px) {
    .current_day_info {
        overflow-y: auto;
        min-width: 200px;
    }
}

.current__weekday {
    font-weight: 600;
}

a {
    text-decoration: none;
    font-weight: 700;
    color: #21005D;
}

a:hover {
    text-decoration: underline;
}
</style>





