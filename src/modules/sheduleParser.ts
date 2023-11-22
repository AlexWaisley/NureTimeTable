import { timeTable, DictionaryDestiny, linkConnectDictionary, linkCheckoutDictionary, lessonsList } from "./dataParser.ts";

import TableInfo from "./tableInfo.ts";
import Lesson from "./lesson.ts";

const getSheduleByDateWithoutEmpty = (date:Date):TableInfo[] => {
    const shedule: TableInfo[] = [];
    const currLessons = getRawSheduleByDate(date);

    currLessons.forEach(x => {
        const elem = new TableInfo();
        elem.StartTime = x.StartTime.slice(0,-3);
        elem.parseLesson(x);
        shedule.push(elem);
    });
    return shedule;
}

const convertUnixToDate = (unix_time: number): Date => {
    return new Date(unix_time * 1000);
};

const getFirstWeekDay = (date: Date): Date => {
    const weekDayNumber = date.getDay();

    const difference = weekDayNumber - 1; 
    date.setDate(date.getDate() - difference);

    return date;
};


const getSheduleForWeek = (date:number|undefined):TableInfo[][]=>{
    if(date===undefined){
        console.log("Date is undefined in getSheduleForWeek");
        return [];
    }
    const nowDate = convertUnixToDate(date);
    const firstWeekDay = getFirstWeekDay(nowDate);

    const sheduleForWeek:TableInfo[][] = [];

    for (let weekDayNumber = 0; weekDayNumber < 6; weekDayNumber++) {
        sheduleForWeek[weekDayNumber] = getSheduleByDate(firstWeekDay);
        firstWeekDay.setDate(firstWeekDay.getDate()+1);
    }

    return sheduleForWeek;
}

const getSheduleByUnix = (date:number|undefined):TableInfo[]=>{
    if(date===undefined){
        console.log("Date is undefined in getSheduleForWeek");
        return [];
    }
    const shedule: TableInfo[] = [];

    const reqDate = convertUnixToDate(date);

    const currLessons = getRawSheduleByDate(reqDate);

    timeTable.forEach(x => {
        const elem = new TableInfo();
        elem.StartTime = x[0];
        elem.EndTime = x[1];
        
        const lessonInThisTime = currLessons.find(lesson => lesson.StartTime.includes(elem.StartTime));

        if (lessonInThisTime !== undefined) {
            elem.parseLesson(lessonInThisTime);
        }

        shedule.push(elem);
    });
    return shedule;
}

const getSheduleByDate = (date:Date|undefined):TableInfo[]=>{
    if(date===undefined){
        console.log("Date is undefined in getSheduleForWeek");
        return [];
    }
    const shedule: TableInfo[] = [];

    const currLessons = getRawSheduleByDate(date);

    timeTable.forEach(x => {
        const elem = new TableInfo();
        elem.StartTime = x[0];
        elem.EndTime = x[1];
        
        const lessonInThisTime = currLessons.find(lesson => lesson.StartTime.includes(elem.StartTime));

        if (lessonInThisTime !== undefined) {
            elem.parseLesson(lessonInThisTime);
        }

        shedule.push(elem);
    });
    return shedule;
}

const getFormatedString = (date:Date):string=>{
    const options:Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedString = date.toLocaleDateString('en-GB', options).split('/').join('.');

    return formattedString;
}

const getRawSheduleByDate = (date:Date): Lesson[]=>{
    const formattedString = getFormatedString(date);
    const currLessons = lessonsList.filter(x => x.StartDate === formattedString);
    
    return currLessons;
}


const getLink = (key: TableInfo, type: DictionaryDestiny): string => {
    switch (type) {
        case DictionaryDestiny.LINK_CONNECT:
            return linkConnectDictionary[key.Theme + ' ' + key.Type];
        case DictionaryDestiny.LINK_CHECKOUT:
            return linkCheckoutDictionary[key.Theme + ' ' + key.Type];
        default:
            console.log("Type is not found");
            return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
};


export{
    getLink,
    getSheduleByDate,
    getSheduleByDateWithoutEmpty,
    getSheduleForWeek,
    getSheduleByUnix,    
}