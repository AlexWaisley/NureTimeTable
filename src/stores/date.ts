import { defineStore } from "pinia";

export const useDateStore = defineStore({
    id:'date',
    state:()=>({
        date:new Date().getTime()
    }),
    actions:{
        updateDate(unixTimestamp:number){
            this.date = unixTimestamp;
        }
    }
});