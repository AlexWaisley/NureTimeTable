import { defineStore } from "pinia";

export const useDateStore = defineStore({
    id:'date',
    state:()=>({
        date:1700679390793
    }),
    actions:{
        updateDate(unixTimestamp:number){
            this.date = unixTimestamp;
        }
    }
});