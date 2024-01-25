import moment from "moment";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useGeneralStore = defineStore('generalStore', () => {
    const CurrentDate = ref(moment());
    const Date = ref(moment().unix());
    const IsTableViewDay = ref(true);

    const updateDate = (daysToAdd: number) => {
        Date.value += daysToAdd * 86400;
    };

    const ChangeTableView = () => {
        IsTableViewDay.value = !IsTableViewDay.value;
    };


    return { CurrentDate, Date, IsTableViewDay, ChangeTableView, updateDate };
});