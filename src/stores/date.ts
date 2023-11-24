import { defineStore } from "pinia";
import { currentDate } from "../modules/dataParser";

export const useDateStore = defineStore({
    id:'date',
    state:()=>({
        date:currentDate.getTime(),
        isTableViewDay: true
    }),
    actions:{
        updateDate(unixTimestamp:number){
            this.date = unixTimestamp;
        },
        changeTableView(){
            this.isTableViewDay = !this.isTableViewDay;
        }
    }
});