import { defineStore } from "pinia";

import { TableInfo, Lesson, StoreItem, TableState } from "../models";
import { api } from "../api";

import { timeTable } from '../stores/tableStaticInfo';

import { ref, onMounted, reactive } from 'vue'
import moment from "moment";
import { useGeneralStore } from "./generalInfo";
import { watch } from "vue";

const EXPIRY_DAYS = 17;
const STORAGE_KEY = 'TableInfo';

export const useTableDataStore = defineStore('tableData', () => {
    //-----------VARIABLES-----------//
    const generalStore = useGeneralStore();
    const tableState = reactive<TableState>({
        connectionLinks: {},
        checkoutLinks: {},
        lessonThemes: {},
        lessonTypes: {},
        lessonToCheckoutLinks: {},
        lessonToConnectionLinks: {},
        lessonsList: []
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
        tableForSelectedWeekDate.value = await getSheduleForWeek(moment.unix(generalStore.Date));
        tableForSelectedDate.value = await getSheduleForDay(moment.unix(generalStore.Date));
        tableForCurrentDay.value = await getSheduleByDateWithoutEmpty(generalStore.CurrentDate);
    });

    const getData = async () => {
        if (!isLocalStorageHaveData()) {
            tableState.lessonToConnectionLinks = await api.getLessonToConnectionLinks();
            tableState.lessonToCheckoutLinks = await api.getLessonToCheckoutLinks();
            tableState.lessonTypes = await api.getTypes();
            tableState.lessonThemes = await api.getThemes();
            tableState.checkoutLinks = await api.getCheckoutLinks();
            tableState.connectionLinks = await api.getConnectionLinks();
            setWithExpiry(STORAGE_KEY, tableState, EXPIRY_DAYS);
        }
    };

    const getLessonList = async (date?: moment.Moment) => {
        date = date || moment();
        if (date.day() !== date.clone().startOf('isoWeek').day()) return;
        const tempData = await api.getSchedule(date);

        const updatedLessonList = tableState.lessonsList.concat(tempData);

        const uniqueTempData = Array.from(new Set(updatedLessonList.map(item =>
            `${item.StartDate}-${item.StartTime}`
        ))).map(key =>
            updatedLessonList.find(item =>
                `${item.StartDate}-${item.StartTime}` === key
            )
        ).filter(item => item !== undefined) as NonNullable<TableInfo[]>;

        const filteredUniqueTempData = uniqueTempData;

        tableState.lessonsList = filteredUniqueTempData.sort((a, b) => {
            const dateA = moment(`${a?.StartDate} ${a?.StartTime}`, 'DD.MM.yyyy HH:mm');
            const dateB = moment(`${b?.StartDate} ${b?.StartTime}`, 'DD.MM.yyyy HH:mm');
            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        });
    }
    //-----------VARIABLES FILLING-----------//

    //-----------LOCALSTORAGE METHODS-----------//
    const isLocalStorageHaveData = (): boolean => {
        const storedData = getWithExpiry(STORAGE_KEY);
        if (storedData !== null) {
            try {
                tableState.connectionLinks = storedData.value.connectionLinks;
                tableState.checkoutLinks = storedData.value.checkoutLinks;
                tableState.lessonThemes = storedData.value.lessonThemes;
                tableState.lessonTypes = storedData.value.lessonTypes;
                tableState.lessonToCheckoutLinks = storedData.value.lessonToCheckoutLinks;
                tableState.lessonToConnectionLinks = storedData.value.lessonToConnectionLinks;
                tableState.lessonsList = storedData.value.lessonsList;
            } catch (error) {
                console.error(`Error while assignment for key TableInfo:`, error);
            }
        }

        let haveData = true;
        for (const key in tableState) {
            if (key == "lessonsList") continue;
            if (tableState[key as keyof typeof tableState] && Object.keys(tableState[key as keyof typeof tableState]).length === 0) {
                haveData = false;
            }
        }

        return haveData;
    }

    const setWithExpiry = (key: string, value: TableState, ttl: number) => {
        const item: StoreItem = {
            value: value,
            expiry: moment().add(ttl, "days").toISOString(),
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    const getWithExpiry = (key: string): StoreItem | null => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item: StoreItem = JSON.parse(itemStr);
        if (moment().isAfter(item.expiry)) {
            localStorage.removeItem(key);
            console.log("EXPIRED!");
            return null;
        }
        return item;
    }
    //-----------LOCALSTORAGE METHODS-----------//

    //-----------SHEDULE METHODS-----------//
    const getSheduleByDateWithoutEmpty = async (date: moment.Moment): Promise<Lesson[]> => {
        let resultInfoArr = tableState.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        if (resultInfoArr.length === 0) {
            await getLessonList(date);
            resultInfoArr = tableState.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        }

        return resultInfoArr.map(info => getFullLessonInfo(info));
    }

    const getSheduleForDay = async (date: moment.Moment): Promise<Lesson[]> => {
        let lessonsForDay: TableInfo[] = tableState.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        if (lessonsForDay.length === 0) {
            await getLessonList(date);
            lessonsForDay = tableState.lessonsList.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
        }

        const resultArr = timeTable.map(([startTime, endTime]) => {
            const tempLesson = lessonsForDay.find((elem) => elem.StartTime === startTime) || {
                ThemeId: "-",
                TypeId: "-",
                Room: "-",
                StartTime: startTime,
                EndTime: endTime,
                StartDate: date.format("DD.MM.yyyy"),
            };
            return getFullLessonInfo(tempLesson);
        });

        return resultArr;
    }

    const getSheduleForWeek = async (date: moment.Moment): Promise<Lesson[][]> => {
        let resultArr = ref<Lesson[][]>([]);
        let firstDate = date.clone().startOf("isoWeek");
        for (let i = 0; i < 7; i++) {
            resultArr.value.push(await getSheduleForDay(firstDate));
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
            lesson.Theme = tableState.lessonThemes[lesson.ThemeId];
            lesson.Type = tableState.lessonTypes[lesson.TypeId];
            lesson.CheckoutLink = tableState.checkoutLinks[tableState.lessonToCheckoutLinks[`${lesson.ThemeId} ${lesson.TypeId}`]] ?? "-";
            lesson.ConnectionLink = tableState.connectionLinks[tableState.lessonToConnectionLinks[`${lesson.ThemeId} ${lesson.TypeId}`]] ?? "-";
        }
        return lesson;
    }
    //-----------SHEDULE METHODS-----------//

    watch(() => generalStore.Date, async (newValue) => {
        if (!isReady) return;
        tableForSelectedWeekDate.value = await getSheduleForWeek(moment.unix(newValue));
        tableForSelectedDate.value = await getSheduleForDay(moment.unix(newValue));
    });

    return {
        getSheduleByDateWithoutEmpty,
        isReady,
        tableForSelectedDate,
        tableForSelectedWeekDate,
        tableForCurrentDay
    }
});