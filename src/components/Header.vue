<script setup lang="ts">
import { defineProps, watch, ref, defineEmits } from 'vue';

defineEmits(['changeDisplaying'])

const properti = defineProps({
    currDate: Date,
    tableViewDay: Boolean
});

const viewDay = ref(properti.tableViewDay);
const currDay = ref(properti.currDate);
const dateString = ref("");

try {
    if (currDay.value === undefined) {
        throw new Error("Current day is undefined.");
    }
    const currMonthLongName = currDay.value.toLocaleString('en-us', { month: 'long' });
    dateString.value = `${currDay.value.getDate()}  ${currMonthLongName}`;
} catch (error) {
    console.log(error);
}

const viewChangeBtnText = ref("");
viewChangeBtnText.value = viewDay ? "Week" : "Day";

watch(() => properti.tableViewDay, async () => {

    const endText = properti.tableViewDay ? "Week" : "Day";

    updateText(viewChangeBtnText.value.length, viewChangeBtnText.value);
    setTimeout(() => writeUpdatedText(1, endText), 400);
});

function writeUpdatedText(count: number, endText: string) {
    if (count <= endText.length) {
        viewChangeBtnText.value = endText.slice(0, count);
        count++;
        setTimeout(() => writeUpdatedText(count, endText), 100);
    }
}

function updateText(count: number, text: string) {
    if (count > 0) {
        viewChangeBtnText.value = text.slice(0, count);
        count--;
        setTimeout(() => updateText(count, text), 100);
    }
}

</script>
<template>
    <div class="app_header">
        <div class="logo-container">
            <img class="logo" src="../assets/logo.jpg" alt="logo" />
            <span>NureTable</span>
        </div>
        <div class="date_container">
            <span>{{ dateString }}</span>
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

