import { defineStore } from "pinia";

import { TableInfo, Lesson, StoreItem } from "../models";
import { api } from "../api";

import { timeTable } from '../stores/tableStaticInfo';

import { ref, onMounted, reactive } from 'vue'
import moment from "moment";
import { useGeneralStore } from "./generalInfo";
import { watch } from "vue";

export const useTableDataStore = defineStore('tableData', () => {
    const generalStore = useGeneralStore();
    //-----------VARIABLES-----------//
    const tableInfo = reactive({
        connectionLinks: ref<Record<string, string>>({}),
        checkoutLinks: ref<Record<string, string>>({}),
        lessonThemes: ref<Record<string, string>>({}),
        lessonTypes: ref<Record<string, string>>({}),
        lessonToCheckoutLinks: ref<Record<string, string>>({}),
        lessonToConnectionLinks: ref<Record<string, string>>({}),
        lessonsList: ref<TableInfo[]>([])
    });

    const isReady = ref(false);
    const tableForSelectedDate = ref<Lesson[]>([]);
    const tableForSelectedWeekDate = ref<Lesson[][]>([]);
    const tableForCurrentDay = ref<Lesson[]>([]);
    //-----------VARIABLES-----------//

    //-----------VARIABLES FILLING-----------//
    onMounted(async () => {
        await getData();
        isReady.value = true;
        tableForSelectedDate.value = await getSheduleForDay(moment.unix(generalStore.Date));
        tableForSelectedWeekDate.value = await getSheduleForWeek(moment.unix(generalStore.Date));
        tableForCurrentDay.value = await getSheduleByDateWithoutEmpty(generalStore.CurrentDate);
    });

    const getData = async () => {
        if (!isLocalStorageHaveData()) {
            tableInfo.lessonToConnectionLinks = await api.getLessonToConnectionLinks();
            tableInfo.lessonToCheckoutLinks = await api.getLessonToCheckoutLinks();
            tableInfo.lessonTypes = await api.getTypes();
            tableInfo.lessonThemes = await api.getThemes();
            tableInfo.checkoutLinks = await api.getCheckoutLinks();
            tableInfo.connectionLinks = await api.getConnectionLinks();
            await getLessonList();
            setWithExpiry('TableInfo', tableInfo, 17);
        }
    };

    const getLessonList = async (date?: moment.Moment) => {
        date = date || moment();
        const tempData = await api.getSchedule(date);

        const updatedLessonList = tableInfo.lessonsList.concat(tempData);

        const uniqueTempData = Array.from(new Set(updatedLessonList.map(item =>
            `${item.StartDate}-${item.StartTime}`
        ))).map(key =>
            updatedLessonList.find(item =>
                `${item.StartDate}-${item.StartTime}` === key
            )
        ).filter(item => item !== undefined) as NonNullable<TableInfo[]>;

        const filteredUniqueTempData = uniqueTempData;

        tableInfo.lessonsList = filteredUniqueTempData.sort((a, b) => {
            const dateA = moment(`${a?.StartDate} ${a?.StartTime}`, 'DD.MM.yyyy HH:mm');
            const dateB = moment(`${b?.StartDate} ${b?.StartTime}`, 'DD.MM.yyyy HH:mm');
            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        });
    }

    //-----------VARIABLES FILLING-----------//

    //-----------LOCALSTORAGE METHODS-----------//
    const isLocalStorageHaveData = (): boolean => {
        const storedData = getWithExpiry('TableInfo');

        if (storedData !== null) {
            try {
                tableInfo.connectionLinks = storedData.value.connectionLinks;
                tableInfo.checkoutLinks = storedData.value.checkoutLinks;
                tableInfo.lessonThemes = storedData.value.lessonThemes;
                tableInfo.lessonTypes = storedData.value.lessonTypes;
                tableInfo.lessonToCheckoutLinks = storedData.value.lessonToCheckoutLinks;
                tableInfo.lessonToConnectionLinks = storedData.value.lessonToConnectionLinks;
                tableInfo.lessonsList = storedData.value.lessonsList;
            } catch (error) {
                console.error(`Error while assignment for key TableInfo:`, error);
            }
        }

        let haveData = true;

        for (const key in tableInfo) {
            if (tableInfo[key as keyof typeof tableInfo] && Object.keys(tableInfo[key as keyof typeof tableInfo]).length === 0) {
                haveData = false;
            }
        }
        return haveData;
    }

    const setWithExpiry = (key: string, value: any, ttl: number) => {
        const now = moment();
        const plainTableInfo = {
            connectionLinks: value.connectionLinks,
            checkoutLinks: value.checkoutLinks,
            lessonThemes: value.lessonThemes,
            lessonTypes: value.lessonTypes,
            lessonToCheckoutLinks: value.lessonToCheckoutLinks,
            lessonToConnectionLinks: value.lessonToConnectionLinks,
            lessonsList: value.lessonsList
        };
        const item: StoreItem = {
            value: plainTableInfo,
            expiry: now.add(ttl, "days").toISOString(),
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    const getWithExpiry = (key: string): StoreItem | null => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item: StoreItem = JSON.parse(itemStr);
        const now = moment();
        if (now.isAfter(item.expiry)) {
            localStorage.removeItem(key);
            console.log("EXPIRED!");
            return null;
        }
        return item;
    }
    //-----------LOCALSTORAGE METHODS-----------//

    //-----------SHEDULE METHODS-----------//
    const getSheduleByDateWithoutEmpty = async (date: moment.Moment): Promise<Lesson[]> => {
        const resultArr = ref<Lesson[]>([]);
        let resultInfoArr = tableInfo.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        if (resultInfoArr.length === 0) {
            await getLessonList(date);
            resultInfoArr = tableInfo.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        }

        resultInfoArr.forEach((info) => resultArr.value.push(getFullLessonInfo(info)));

        return resultArr.value;
    }

    const getSheduleForDay = async (date: moment.Moment): Promise<Lesson[]> => {
        const resultArr = ref<Lesson[]>([]);
        const lessonsForDay = ref<TableInfo[]>([]);
        lessonsForDay.value = tableInfo.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));

        if (lessonsForDay.value.length === 0) {
            await getLessonList(date);
            lessonsForDay.value = tableInfo.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        }

        resultArr.value = timeTable.map(([startTime, endTime]) => {
            const tempLesson = lessonsForDay.value.find((elem) => elem.StartTime === startTime) || {
                ThemeId: "-",
                TypeId: "-",
                Room: "-",
                StartTime: startTime,
                EndTime: endTime,
                StartDate: date.format("DD.MM.yyyy"),
            };
            return getFullLessonInfo(tempLesson);
        });

        return resultArr.value;
    }

    const getSheduleForWeek = async (date: moment.Moment): Promise<Lesson[][]> => {
        let resultArr = ref<Lesson[][]>([]);
        let firstDate = date.clone().startOf("isoWeek");
        for (let i = 0; i < 7; i++) {
            let lessonsForDay = await getSheduleForDay(firstDate);
            resultArr.value.push([...lessonsForDay]);
            firstDate.add(1, 'days');
        }
        return resultArr.value;
    }

    const getFullLessonInfo = (info: TableInfo): Lesson => {
        let lesson: Lesson = {
            ThemeId: info.ThemeId,
            Theme: "-",
            TypeId: info.TypeId,
            Type: "-",
            Room: info.Room,
            StartTime: info.StartTime.slice(0, -3),
            EndTime: info.EndTime.slice(0, -3),
            StartDate: info.StartDate,
            ConnectionLink: "-",
            CheckoutLink: "-"
        };
        if (lesson.ThemeId !== "-") {
            lesson.Theme = tableInfo.lessonThemes[lesson.ThemeId];
            lesson.Type = tableInfo.lessonTypes[lesson.TypeId];
            lesson.CheckoutLink = tableInfo.checkoutLinks[tableInfo.lessonToCheckoutLinks[`${lesson.ThemeId} ${lesson.TypeId}`]] ?? "-";
            lesson.ConnectionLink = tableInfo.connectionLinks[tableInfo.lessonToConnectionLinks[`${lesson.ThemeId} ${lesson.TypeId}`]] ?? "-";
        }
        return lesson;
    }
    //-----------SHEDULE METHODS-----------//

    watch(() => generalStore.Date, async (newValue) => {
        if (!isReady) return;
        tableForSelectedDate.value = await getSheduleForDay(moment.unix(newValue));
    });

    watch(() => generalStore.Date, async (newValue) => {
        if (!isReady) return;
        tableForSelectedWeekDate.value = await getSheduleForWeek(moment.unix(newValue));
    });

    return {
        getSheduleByDateWithoutEmpty,
        isReady,
        tableForSelectedDate,
        tableForSelectedWeekDate,
        tableForCurrentDay
    }
}); 