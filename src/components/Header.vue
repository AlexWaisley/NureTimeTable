<script setup lang="ts">
import { UpdateTextObject } from "../modules/additionalTypes.ts";

import { useDateStore } from "../stores/date.ts";
import { useTableViewInfo } from "../stores/tableViewInfo.ts";
import { useTableDataStore } from "../stores/tableData.ts";
const dateStore = useDateStore();
const tableViewInfo = useTableViewInfo();
const tableData = useTableDataStore();

import { watch, ref } from 'vue';

const getFirstWeekDay = tableData.getFirstWeekDay;

const isTableViewDay = ref(tableViewInfo.IsTableViewDay);
const dateString = ref("");
const date = ref<Date>(new Date(dateStore.Date));
const viewChangeBtnText = ref(isTableViewDay.value ? "Week" : "Day");

watch(() => dateStore.Date, () => {
    updateShowedDate();
});

watch(() => tableViewInfo.IsTableViewDay, async () => {
    isTableViewDay.value = tableViewInfo.IsTableViewDay;
    await updateShowedDate();
    await updateShowedTableView();
});

const updateShowedTableView = async () => {
    const endText = isTableViewDay.value ? "Week" : "Day";

    updateText({ count: viewChangeBtnText.value.length, endText: viewChangeBtnText.value, element: viewChangeBtnText });
    setTimeout(() =>
        writeUpdatedText({ count: 1, endText, element: viewChangeBtnText }),
        viewChangeBtnText.value.length * 100
    );
}

const updateShowedDate = async () => {
    const formattedDate = formatDisplayDate(date.value);
    dateString.value = formattedDate;
};

const formatDisplayDate = (value: Date) => {
    if (isTableViewDay.value) {
        const currMonthLongName = value.toLocaleString('en-us', { month: 'long' });
        return `${value.getDate()} ${currMonthLongName}`;
    } else {
        const firstWeekDay = getFirstWeekDay(value);
        const lastWeekDay = new Date(firstWeekDay);
        const weekPeriod = 5;
        lastWeekDay.setDate(lastWeekDay.getDate() + weekPeriod);

        const firstWeekDayMonth = firstWeekDay.toLocaleString('en-us', { month: 'long' });
        const lastWeekDayMonth = lastWeekDay.toLocaleString('en-us', { month: 'long' });

        return `${firstWeekDay.getDate()} ${firstWeekDayMonth} - ${lastWeekDay.getDate()} ${lastWeekDayMonth}`;
    }
};

function writeUpdatedText(obj: UpdateTextObject): void {
    const { count, endText, element } = obj;

    if (count <= endText.length) {
        element.value = endText.slice(0, count);
        obj.count++;
        setTimeout(() => writeUpdatedText(obj), 100);
    }
}

function updateText(obj: UpdateTextObject): void {
    const { count, endText, element } = obj;

    if (count > 0) {
        element.value = endText.slice(0, count);
        obj.count--;
        setTimeout(() => updateText(obj), 100);
    }
}

const changeDay = (period: number) => {
    if (!isTableViewDay.value) {
        period *= 7;
    }
    date.value.setDate(date.value.getDate() + period);
    dateStore.updateDate(date.value.getTime());
};

updateShowedDate();
</script>
<template>
    <div class="app_header">
        <div class="logo-container">
            <img class="logo" src="/logo.jpg" alt="logo" />
            <span>NureTable</span>
        </div>
        <div class="changeDay__container">
            <div class="changeDay__btn" @click="changeDay(-1)">
                <img src="/switcher_left.svg">
            </div>
            <div class="date_container">
                <span>{{ dateString }}</span>
            </div>
            <div class="changeDay__btn" @click="changeDay(1)">
                <img src="/switcher_right.svg">
            </div>
        </div>
        <div class="view-display-container">
            <button type="button" @click="tableViewInfo.ChangeTableView" class="view-display-btn">{{ viewChangeBtnText }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.app_header {
    display: grid;
    max-height: 100%;
    width: 100%;
    box-shadow: 2px 2px 2px #6650a459;
    background-color: #6750A4;
    color: #fff;
    font-size: 1.7rem;
}

@media screen and (min-width:590px) {
    .app_header {
        grid-template-columns: 1fr 2fr 1fr;

    }
}

.changeDay__btn {
    background: none;
    border-radius: 10px;
    color: #fff;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    user-select: none;
}

.changeDay__btn:hover {
    background-color: #4b348c;
}

.changeDay__container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-items: center;
    align-items: center;
}

.logo-container {
    display: grid;
    height: 100%;
    gap: .5rem;
    padding: 0 .7rem;
    justify-items: center;
}

.logo {
    border-radius: 10px;
    height: 80px;
}

.date_container {
    display: grid;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-weight: 700;
    text-overflow: ellipsis;
}

.view-display-container {
    display: grid;
    align-items: center;
    justify-content: end;
    padding: .6rem;
}

.view-display-btn {
    background: none;
    border-radius: 10px;
    color: #fff;
    border: 1px solid #fff;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-display-btn:hover {
    background-color: #4b348c;
}
</style>

