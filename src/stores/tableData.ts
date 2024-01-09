import { defineStore } from "pinia";

import { timeTable } from "./tableStaticInfo.ts";

import { Lesson, TableInfo, DictionaryDestiny } from "../models";

import { api } from "../api";

import { ref, Ref, onMounted } from 'vue'


export const useTableDataStore = defineStore('tableData', () => {

    let connectionLinks: Ref<Record<string, string>> = ref({});
    let checkoutLinks: Ref<Record<string, string>> = ref({});
    let lessonThemes: Ref<Record<string, string>> = ref({});
    let lessonTypes: Ref<Record<string, string>> = ref({});
    const lessonsList: Ref<Lesson[]> = ref([]);

    const getLessonList = async () => {
        lessonsList.value = await api.getSchedule();
    }
    const getConnectionLinks = async () => {
        connectionLinks.value = await api.getConnectionLinks();
    }
    const getCheckoutLinks = async () => {
        checkoutLinks.value = await api.getCheckoutLinks();
    }
    const getLessonThemes = async () => {
        lessonThemes.value = await api.getThemes();
    }
    const getLessonTypes = async () => {
        lessonTypes.value = await api.getTypes();
    }

    const getData = async () => {
        await Promise.all([
            getLessonList(),
            getConnectionLinks(),
            getCheckoutLinks(),
            getLessonThemes(),
            getLessonTypes()
        ]);
    };

    onMounted(() => {
        getData();
    })

    const IsTableViewDay = ref(true);

    const ChangeTableView = () => {
        IsTableViewDay.value = !IsTableViewDay.value;
    }


    return {
        linkCheckoutDictionary: checkoutLinks,
        linkConnectDictionary: connectionLinks,
        themeDictionary: lessonThemes,
        typeDictionary: lessonTypes,
        lessonsList,
    }

}); 