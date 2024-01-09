import { defineStore } from "pinia";

export const useDateStore = defineStore({
    id:'date',
    state:()=>({
        CurrentDate: new Date(),
        PickedDateUnix: new Date().getTime(),        
        Date: new Date().getTime()
    }),
    actions:{
        updateDate(unixTimestamp:number){
            this.Date = unixTimestamp;
        },
        updateUnixTimestamp(date:Date) {
            this.PickedDateUnix = Math.floor(date.getTime());
        }
    }
});