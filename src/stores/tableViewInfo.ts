import { defineStore } from "pinia";
import {ref} from 'vue'

export const useTableViewInfo = defineStore('tableViewInfo',()=>{    
        const IsTableViewDay = ref(true);
        
        const ChangeTableView = ()=>{
            IsTableViewDay.value= !IsTableViewDay.value;
        }
        
        return{IsTableViewDay, ChangeTableView}    
});