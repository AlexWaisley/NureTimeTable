<script setup lang="ts">
//data import
import themesData from '../data/theme.json';
import typesData from '../data/type.json';

const timeTable = ref<string[][]>([
    ["7:45", "9:20"],
    ["9:30", "11:05"],
    ["11:15", "12:50"],
    ["13:10", "14:45"],
    ["14:55", "16:30"],
    ["16:40", "18:15"]
]);
const themeDictionary = ref<Record<string, string>>(themesData._value);
const typeDictionary = ref<Record<string, string>>(typesData._value);


//modules import
import LessonClass from '../modules/lesson.ts';
import TableInfo from '../modules/tableInfo.ts';

//vue components import
import Lesson from './Lesson.vue';
import DailySheduleSidebar from './DailySheduleSidebar.vue';

import { defineProps, ref, watch } from 'vue'

const changeDay = (period: number) => {
    date.value?.setDate(date.value.getDate() + period);
    fillTodayLessonsList();
    updateDayTable();
};

const updateDayTable = () => {
    dayLesson.value.length = 0;
    timeTable.value.forEach(x => {
        let elem = new TableInfo();
        elem.StartTime = x[0];
        elem.EndTime = x[1];
        let i = tempLessons.value.find(lesson => lesson.StartTime.includes(elem.StartTime))?.Theme;
        elem.Theme = i ? i : "-";
        const fullInfoSplited = elem.Theme.split(' ');
        elem.Theme = themeDictionary.value[fullInfoSplited[0]] || "-";
        elem.Type = typeDictionary.value[fullInfoSplited[1]] || "-";
        elem.Room = fullInfoSplited.slice(2, -1).join(' ') || "-";
        dayLesson.value?.push(elem);
    });
}

const fillTodayLessonsList = () => {
    const formattedString = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
        .format(date.value)
        .split('/')
        .join('.');

    const currLessons = lessonsList.value.filter(x => x.StartDate === formattedString);
    tempLessons.value = currLessons;
}

watch(() => properti.tableViewDay, (newVal) => { tableViewDay.value = newVal })

const properti = defineProps({
    tableViewDay: Boolean,
    allLessons: Array,
    dateInfo: Date
});

const tableViewDay = ref(properti.tableViewDay);
const lessonsList = ref<LessonClass[]>(properti.allLessons as LessonClass[]);
const tempLessons = ref<LessonClass[]>([]);

const dayLesson = ref<TableInfo[]>([]);
const todayLessons = ref<TableInfo[]>([]);
const weekLessons = ref<TableInfo[]>([]);
const date = ref(properti.dateInfo);


fillTodayLessonsList();
updateDayTable();

todayLessons.value = dayLesson.value.filter(x => x.Theme !== "-");

</script>
<template>
    <div class="main">
        <aside class="current_day_info">
            <DailySheduleSidebar :today-lessons="todayLessons" :date-info="date"></DailySheduleSidebar>
        </aside>
        <div class="table_container">
            <div v-if="properti.tableViewDay" class="day">
                <div class="lesson_container" v-for="lesson_info in dayLesson">
                    <Lesson :start-time-p="lesson_info.StartTime" :end-time-p="lesson_info.EndTime"
                        :theme-p="lesson_info.Theme" :type-p="lesson_info.Type" :room-p="lesson_info.Room">
                    </Lesson>
                </div>
            </div>
            <div v-else class="week">
                <div class="week__day" v-for="_ in 7">
                    <span>30 october Monday</span>
                    <div class="lesson_container" v-for="_ in 3">
                        <Lesson></Lesson>
                    </div>
                </div>
            </div>
        </div>
        <div class="switcher">
            <span>Date:</span>
            <span>{{ Intl.DateTimeFormat('ko-KR', {
                day: '2-digit', month: '2-digit', year: '2-digit'
            }).format(date) }}</span>
            <button @click="changeDay(-1)"><span>prev</span></button>
            <button @click="changeDay(1)"><span>next</span></button>
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
    width: 9rem;
    height: 38rem;
    max-height: 90%;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
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
    width: 100%;
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





