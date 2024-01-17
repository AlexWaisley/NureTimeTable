import moment from "moment";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useGeneralStore = defineStore('GeneralStore', () => {
    let CurrentDate = moment();
    let Date = moment();
    let IsTableViewDay = ref(true);
    let IsUpdated = ref(false);

    const updateDate = (daysToAdd: number) => {
        Date.add(daysToAdd, 'days');
        IsUpdated.value = !IsUpdated.value;
    };

    const ChangeTableView = () => {
        IsTableViewDay.value = !IsTableViewDay.value;
    };

    return { CurrentDate, IsUpdated, Date, IsTableViewDay, ChangeTableView, updateDate };
});