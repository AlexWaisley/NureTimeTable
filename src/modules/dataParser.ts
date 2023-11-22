import themesData from '../data/theme.json';
import typesData from '../data/type.json';
import sheduleData from '../data/Table.json';
import linksConnectData from '../data/linkConnect.json';
import linksCheckoutData from '../data/linkCheckout.json';


const linkConnectDictionary: Record<string, string> = linksConnectData._value;
const linkCheckoutDictionary: Record<string, string> = linksCheckoutData._value;
const themeDictionary: Record<string, string> = themesData._value;
const typeDictionary:Record<string, string> = typesData._value;
const lessonsList: Lesson[] = (sheduleData.lessons);
const timeTable: string[][] = [
    ["7:45", "9:20"],
    ["9:30", "11:05"],
    ["11:15", "12:50"],
    ["13:10", "14:45"],
    ["14:55", "16:30"],
    ["16:40", "18:15"]
];

const weekDaysList: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

import Lesson from './lesson';

const currentDate = new Date();

enum DictionaryDestiny {
    LINK_CONNECT,
    LINK_CHECKOUT
}

export{
    currentDate,
    DictionaryDestiny,
    themeDictionary,
    typeDictionary,
    linkConnectDictionary,
    linkCheckoutDictionary,
    lessonsList,
    timeTable,
    weekDaysList,
};