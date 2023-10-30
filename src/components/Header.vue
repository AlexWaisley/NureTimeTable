<script setup lang="ts">
import { defineProps, watch, ref, defineEmits } from 'vue';

defineEmits(['changeDisplaying'])

const properti = defineProps({
    dateString: String,
    tableViewDay: Boolean
});

const viewDay = ref(properti.tableViewDay);
let viewChangeBtnText = viewDay ? "Week" : "Day";

watch(properti, () => {
    viewChangeBtnText = properti.tableViewDay ? "Week" : "Day";
});

</script>
<template>
    <header>
        <div class="logo">
            <img src="../assets/logo.jpg" alt="logo" />
            <span>NureTable</span>
        </div>
        <div class="date">
            <span>{{ properti.dateString }}</span>
        </div>
        <div class="view-display-container">
            <button @click="$emit('changeDisplaying')" class="display-view">{{ viewChangeBtnText }}</button>
        </div>
    </header>
</template>
<style scoped>
header {
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 25% 50% 25%;
    gap: .5rem;
    padding: 0 20px;
    min-height: 100px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 2;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    margin-right: 10px;
    height: 80px;
}

.logo span {
    font-size: 1.5rem;
    font-weight: 700;
}

.date {
    display: grid;
    font-size: 2rem;
    font-weight: 700;
    justify-content: center;
    align-items: center;
}

.view-display-container {
    display: flex;
    justify-content: end;
}
</style>

