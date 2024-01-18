import { ref, Ref } from 'vue';
import { Lesson, TableInfo } from '../models';
import { useTableDataStore } from '../stores/tableData';
import { timeTable } from '../stores/tableStaticInfo';
import moment from 'moment';

let connectionLinks: Ref<Record<string, string>>;
let checkoutLinks: Ref<Record<string, string>>;
let lessonThemes: Ref<Record<string, string>>;
let lessonTypes: Ref<Record<string, string>>;
let lessonToCheckoutLinks: Ref<Record<string, string>>;
let lessonToConnectionLinks: Ref<Record<string, string>>;
let lessonsList: Ref<TableInfo[]> = ref([]);

const initRefs = () => {
    const tableDataStore = useTableDataStore();
    connectionLinks = ref(tableDataStore.connectionLinks);
    checkoutLinks = ref(tableDataStore.checkoutLinks);
    lessonThemes = ref(tableDataStore.lessonThemes);
    lessonTypes = ref(tableDataStore.lessonTypes);
    lessonToCheckoutLinks = ref(tableDataStore.lessonToCheckoutLinks);
    lessonToConnectionLinks = ref(tableDataStore.lessonToConnectionLinks);
    lessonsList = ref(tableDataStore.lessonsList);
};

const getSheduleByDateWithoutEmpty = async (date: moment.Moment): Promise<Lesson[]> => {
    const tableDataStore = useTableDataStore();
    let resultArr = ref<Lesson[]>([]);
    let resultInfoArr = lessonsList.value.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
    if (resultInfoArr.length === 0) {
        await tableDataStore.getLessonList(date);
        resultInfoArr = lessonsList.value.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
    }

    resultInfoArr.forEach((info) => resultArr.value.push(getFullLessonInfo(info)));

    return resultArr.value;
}

const getSheduleForWeek = async (date: moment.Moment): Promise<Lesson[][]> => {
    let resultArr = ref<Lesson[][]>([]);
    let firstDate = date.clone().startOf("isoWeek");
    for (let i = 0; i < 7; i++) {
        let lessonsForDay = await getSheduleForDay(firstDate);
        resultArr.value.push([...lessonsForDay]);
        firstDate.add(1, 'days');
    }
    return resultArr.value;
}

const getSheduleForDay = async (date: moment.Moment): Promise<Lesson[]> => {
    const tableDataStore = useTableDataStore();
    let resultArr = ref<Lesson[]>([]);
    let lessonsForDay = ref<TableInfo[]>([]);
    lessonsForDay.value = lessonsList.value.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));

    if (lessonsForDay.value.length === 0) {
        await tableDataStore.getLessonList(date);
        lessonsForDay.value = lessonsList.value.filter((elem) => elem.StartDate === date.format("DD.MM.yyyy"));
    }

    timeTable.forEach((time) => {
        const [startTime, endTime] = time;
        let info: TableInfo = {
            ThemeId: "-",
            TypeId: "-",
            Room: "-",
            StartTime: startTime,
            EndTime: endTime,
            StartDate: date.format("DD.MM.yyyy"),
        }
        const tempLesson = lessonsForDay.value.find((elem) => elem.StartTime === startTime + ":00");
        if (tempLesson !== undefined) {
            info = tempLesson;
        }
        const lesson = getFullLessonInfo(info);
        resultArr.value.push(lesson);
    });

    return resultArr.value;
}

const getFullLessonInfo = (info: TableInfo): Lesson => {
    let lesson: Lesson = {
        ThemeId: info.ThemeId,
        Theme: "-",
        TypeId: info.TypeId,
        Type: "-",
        Room: info.Room,
        StartTime: info.StartTime,
        EndTime: info.EndTime,
        StartDate: info.StartDate,
        ConnectionLink: "-",
        CheckoutLink: "-"
    };
    if (lesson.ThemeId !== "-") {
        lesson.StartTime = lesson.StartTime.slice(0, -3);
        lesson.EndTime = lesson.EndTime.slice(0, -3);
        lesson.Theme = lessonThemes.value[lesson.ThemeId];
        lesson.Type = lessonTypes.value[lesson.TypeId];
        let linkId = lessonToCheckoutLinks.value[`${lesson.ThemeId} ${lesson.TypeId}`];
        lesson.CheckoutLink = checkoutLinks.value[linkId];
        linkId = lessonToConnectionLinks.value[`${lesson.ThemeId} ${lesson.TypeId}`];
        lesson.ConnectionLink = connectionLinks.value[linkId];
    }
    return lesson;
}

export {
    getFullLessonInfo,
    getSheduleByDateWithoutEmpty,
    getSheduleForDay,
    getSheduleForWeek,
    initRefs,
}