import { defineStore } from "pinia";

import { TableInfo } from "../models";
import { api } from "../api";

import { ref, Ref, onMounted } from 'vue'
import moment from "moment";
import { initRefs } from '../storageUtils';

export const useTableDataStore = defineStore('tableData', () => {
    let connectionLinks: Ref<Record<string, string>> = ref({});
    let checkoutLinks: Ref<Record<string, string>> = ref({});
    let lessonThemes: Ref<Record<string, string>> = ref({});
    let lessonTypes: Ref<Record<string, string>> = ref({});
    let lessonToCheckoutLinks: Ref<Record<string, string>> = ref({});
    let lessonToConnectionLinks: Ref<Record<string, string>> = ref({});
    const lessonsList: Ref<TableInfo[]> = ref([]);

    const getLessonList = async (date: moment.Moment) => {
        const tempData = await api.getSchedule(date);
        lessonsList.value.push(...tempData);
        const uniqueTempData = lessonsList.value.filter((value, index, self) =>
            self.findIndex((elem) =>
                elem.ThemeId === value.ThemeId &&
                elem.TypeId === value.TypeId &&
                elem.Room === value.Room &&
                elem.StartDate === value.StartDate &&
                elem.StartTime === value.StartTime
            ) === index
        );
        lessonsList.value = uniqueTempData.sort((a, b) => {
            const dateA = moment(`${a.StartDate} ${a.StartTime}`, 'DD.MM.yyyy HH:mm');
            const dateB = moment(`${b.StartDate} ${b.StartTime}`, 'DD.MM.yyyy HH:mm');

            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        });
        localStorage.setItem('lessonsList', JSON.stringify(lessonsList.value));
    }

    const getConnectionLinks = async () => {
        connectionLinks.value = await api.getConnectionLinks();
        localStorage.setItem('connectionLinks', JSON.stringify(connectionLinks.value));
    }
    const getCheckoutLinks = async () => {
        checkoutLinks.value = await api.getCheckoutLinks();
        localStorage.setItem('checkoutLinks', JSON.stringify(checkoutLinks.value));
    }
    const getLessonThemes = async () => {
        lessonThemes.value = await api.getThemes();
        localStorage.setItem('lessonThemes', JSON.stringify(lessonThemes.value));
    }
    const getLessonTypes = async () => {
        lessonTypes.value = await api.getTypes();
        localStorage.setItem('lessonTypes', JSON.stringify(lessonTypes.value));
    }
    const getLessonToCheckLinks = async () => {
        lessonToCheckoutLinks.value = await api.getLessonToCheckoutLinks();
        localStorage.setItem('lessonToCheckoutLinks', JSON.stringify(lessonToCheckoutLinks.value));
    }
    const getLessonToConnectLinks = async () => {
        lessonToConnectionLinks.value = await api.getLessonToConnectionLinks();
        localStorage.setItem('lessonToConnectionLinks', JSON.stringify(lessonToConnectionLinks.value));
    }

    const getData = async () => {
        if (!isLocalStorageHaveData()) {
            await Promise.all([
                getLessonToConnectLinks(),
                getLessonToCheckLinks(),
                getLessonList(moment()),
                getConnectionLinks(),
                getCheckoutLinks(),
                getLessonThemes(),
                getLessonTypes(),
            ]);
        }
    };

    onMounted(async () => {
        await getData();
        initRefs();
    });

    const isLocalStorageHaveData = (): boolean => {
        loadFromLocalStorage('lessonsList', lessonsList);
        loadFromLocalStorage('connectionLinks', connectionLinks);
        loadFromLocalStorage('checkoutLinks', checkoutLinks);
        loadFromLocalStorage('lessonThemes', lessonThemes);
        loadFromLocalStorage('lessonTypes', lessonTypes);
        loadFromLocalStorage('lessonToCheckoutLinks', lessonToCheckoutLinks);
        loadFromLocalStorage('lessonToConnectionLinks', lessonToConnectionLinks);

        const isEmpty = [lessonsList, connectionLinks, checkoutLinks, lessonThemes, lessonTypes, lessonToCheckoutLinks, lessonToConnectionLinks]
            .some((ref) => {
                if (Array.isArray(ref.value)) {
                    return ref.value.length === 0;
                } else if (typeof ref.value === 'object' && ref.value !== null) {
                    return Object.keys(ref.value).length === 0;
                } else {
                    return !ref.value;
                }
            });
        return !isEmpty;
    }

    const loadFromLocalStorage = <T>(key: string, targetRef: Ref<T>) => {
        const storedData = localStorage.getItem(key);

        if (storedData !== null) {
            try {
                const parsedData: T = JSON.parse(storedData);
                targetRef.value = parsedData;
            } catch (error) {
                console.error(`Error parsing JSON for key ${key}:`, error);
            }
        }
    };

    return {
        connectionLinks,
        checkoutLinks,
        lessonThemes,
        lessonTypes,
        lessonsList,
        lessonToCheckoutLinks,
        lessonToConnectionLinks,
        getLessonList
    }
}); 