<script setup lang="ts">
import { TextObject } from "../models";
import moment from "moment";

import { useGeneralStore } from "../stores/generalInfo.ts";
const generalStore = useGeneralStore();

import { watch, ref } from 'vue';

const viewChangeBtnText = ref(generalStore.IsTableViewDay ? "Week" : "Day");

const updateShowedTableView = () => {
    const endText = generalStore.IsTableViewDay ? "Week" : "Day";

    eraseText({ count: viewChangeBtnText.value.length, endText: viewChangeBtnText.value, element: viewChangeBtnText });
    setTimeout(() =>
        writeUpdatedText({ count: 1, endText, element: viewChangeBtnText }),
        viewChangeBtnText.value.length * 100
    );
}

const updateShowedDate = () => {
    dateString.value = formatDisplayDate();
};

const formatDisplayDate = (): string => {
    const tempDate = moment.unix(generalStore.Date);
    if (generalStore.IsTableViewDay) {
        return tempDate.format("DD MMMM");
    } else {
        const firstWeekDay = tempDate.startOf('isoWeek').format("DD MMMM");
        const lastWeekDay = tempDate.endOf('isoWeek').format("DD MMMM");
        return `${firstWeekDay} - ${lastWeekDay}`;
    }
};

const writeUpdatedText = (obj: TextObject): void => {
    const { count, endText, element } = obj;

    while (count <= endText.length) {
        element.value = endText.slice(0, count);
        obj.count++;
        setTimeout(() => { }, 100);
    }
}

const eraseText = (obj: TextObject): void => {
    const { count, endText, element } = obj;
    while (count > 0) {
        element.value = endText.slice(0, count);
        obj.count--;
        setTimeout(() => { }, 100);
    }
}

const changeDay = (period: number) => {
    period = generalStore.IsTableViewDay ? period : period * 7;

    generalStore.updateDate(period);
    updateShowedDate();
};

watch(() => generalStore.IsTableViewDay, () => {
    updateShowedDate();
    updateShowedTableView();
});

const dateString = ref(formatDisplayDate());
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
            <button type="button" @click="generalStore.ChangeTableView" class="view-display-btn">{{ viewChangeBtnText }}
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

