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

    if (count <= endText.length) {
        element.value = endText.slice(0, count);
        obj.count++;
        setTimeout(() => writeUpdatedText(obj), 100);
    }
}

const eraseText = (obj: TextObject): void => {
    const { count, endText, element } = obj;

    if (count > 0) {
        element.value = endText.slice(0, count);
        obj.count--;
        setTimeout(() => eraseText(obj), 100);
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
<style lang="scss" scoped>
@use '../styles/mixin' as mixin;
@use '../styles/variables' as variables;

.app_header {
    display: grid;
    max-height: 100%;
    width: 100%;
    box-shadow: 2px 2px 2px rgba(102, 80, 164, 0.349);
    background-color: variables.$header-bg-color;
    color: #fff;
    font-size: 1.7rem;

    @media screen and (min-width:590px) {
        grid-template-columns: 1fr 2fr 1fr;
    }
}


.changeDay__btn {
    @include mixin.standartButtonStyle();
}

.view-display-btn {
    @include mixin.standartButtonStyle();
    border: 1px solid #fff;
}

.changeDay__container {
    @include mixin.gridFullCenter;
    grid-template-columns: 1fr 3fr 1fr;
}

.logo-container {
    display: grid;
    justify-items: center;
    height: 100%;
    gap: .5rem;
    padding: 0 .7rem;
}

.logo {
    border-radius: 10px;
    height: 80px;
}

.date_container {
    @include mixin.gridFullCenter;
    font-weight: 700;
}

.view-display-container {
    @include mixin.gridFullCenter;
    justify-content: end;
    padding: .6rem;
}
</style>

