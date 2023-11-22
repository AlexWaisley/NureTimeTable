<script setup lang="ts">
import { defineProps, watch, ref, defineEmits } from 'vue';
import { useDateStore } from "../stores/date.ts";
import { getFirstWeekDay } from "../modules/sheduleParser.ts";

const storeDate = useDateStore();

defineEmits(['changeDisplaying'])

const properti = defineProps({
    currDate: Date,
    tableViewDay: Boolean
});

const viewDay = ref(properti.tableViewDay);
const dateString = ref("");
const date = ref<Date>(new Date(storeDate.date));

const updateShowedDate = () => {
    try {
        if (date.value === undefined) {
            throw new Error("Current day is undefined.");
        }

        const formattedDate = formatDisplayDate(date.value);


        updateText({ count: dateString.value.length, endText: dateString.value, element: dateString });
        setTimeout(() => writeUpdatedText({ count: 1, endText: formattedDate, element: dateString }), dateString.value.length * 100);


    } catch (error) {
        console.error(error);
    }
};

const formatDisplayDate = (value: Date) => {
    if (properti.tableViewDay) {
        const currMonthLongName = value.toLocaleString('en-us', { month: 'long' });
        return `${value.getDate()} ${currMonthLongName}`;
    } else {
        const firstWeekDay = getFirstWeekDay(value);
        const lastWeekDay = new Date(firstWeekDay);
        const daysToAdd = 5;
        lastWeekDay.setDate(lastWeekDay.getDate() + daysToAdd);

        const firstWeekDayMonth = firstWeekDay.toLocaleString('en-us', { month: 'long' });
        const lastWeekDayMonth = lastWeekDay.toLocaleString('en-us', { month: 'long' });

        return `${firstWeekDay.getDate()} ${firstWeekDayMonth} - ${lastWeekDay.getDate()} ${lastWeekDayMonth}`;
    }
};

watch(() => storeDate.date, () => {
    updateShowedDate();
})

const viewChangeBtnText = ref("");
viewChangeBtnText.value = viewDay ? "Week" : "Day";

watch(() => properti.tableViewDay, async () => {
    const endText = properti.tableViewDay ? "Week" : "Day";
    updateShowedDate();

    updateText({ count: viewChangeBtnText.value.length, endText: viewChangeBtnText.value, element: viewChangeBtnText });
    setTimeout(() => writeUpdatedText({ count: 1, endText, element: viewChangeBtnText }), viewChangeBtnText.value.length * 100);
});

type UpdateTextObject = {
    count: number;
    endText: string;
    element: { value: string };
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
    if (!properti.tableViewDay) {
        period *= 7;
    }
    date?.value.setDate(date.value.getDate() + period);
    storeDate.updateDate(date.value.getTime());
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
                <img src="/public/switcher_left.svg">
            </div>
            <div class="date_container">
                <span>{{ dateString }}</span>
            </div>
            <div class="changeDay__btn" @click="changeDay(1)">
                <img src="/public/switcher_right.svg">
            </div>
        </div>
        <div class="view-display-container">
            <button type="button" @click="$emit('changeDisplaying')" class="view-display-btn">{{ viewChangeBtnText
            }}</button>
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

