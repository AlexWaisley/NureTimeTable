import Lesson from "./lesson.ts";
import { themeDictionary, typeDictionary } from "./dataParser.ts";

export default class TableInfo{
    Theme:string = "-";
    Type:string = "-";
    Room:string = "-";
    StartTime:string = "-";
    EndTime:string = "-";
    parseLesson:(lesson:Lesson)=>void = (lesson: Lesson)=>{
        const fullInfoSplited = lesson.Theme.split(' ');
        this.Theme = themeDictionary[fullInfoSplited[0]];
        this.Type = typeDictionary[fullInfoSplited[1]];
        this.Room = fullInfoSplited.slice(2, -1).join(' ').trimEnd();
    };
}