<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'

let properti = defineProps({
    startTimeP: String,
    endTimeP: String,
    themeP: String,
    typeP: String,
    roomP: String,
});

const theme = ref(properti.themeP);
const type = ref(properti.typeP);
const room = ref(properti.roomP);
const startTime = ref(properti.startTimeP);
const endTime = ref(properti.endTimeP);

watchEffect(() => {
    theme.value = properti.themeP;
    type.value = properti.typeP;
    room.value = properti.roomP;
    startTime.value = properti.startTimeP;
    endTime.value = properti.endTimeP;
});

</script>
<template>
    <div class="lesson">
        <div class="lesson__time">
            <div class="lesson__time-start">{{ startTime }}</div>
            <div class="lesson__time-end">{{ endTime }}</div>
        </div>
        <hr>
        <div class="lesson__name">{{ theme }}</div>
        <hr>
        <div class="lesson__type">{{ type }}</div>
        <hr>
        <div class="lesson__room">{{ room }}</div>
    </div>
</template>

<style scoped>
.lesson {
    display: flex;
    flex-direction: row;
    gap: .3rem;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    padding: 5px .7rem;
    font-size: 1.25rem;
    font-weight: 500;
    width: 100%;
}

.lesson__time {
    flex: 1;
}

.lesson__name {
    flex: 2;
}

.lesson__type {
    flex: 2;
}

.lesson__room {
    flex: 1;
}

hr {
    height: 100%
}
</style>