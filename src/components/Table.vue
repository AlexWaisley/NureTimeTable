<script setup lang="ts">
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import { ref, watch, computed } from 'vue';

import { useGeneralStore } from '../stores/generalInfo';

const generalStore = useGeneralStore();

const isTableViewDay = ref<boolean>(generalStore.IsTableViewDay);

const viewDayTable = computed(() => ({
    active: isTableViewDay.value,
    disabled: !isTableViewDay.value
}));

const viewWeekTable = computed(() => ({
    active: !isTableViewDay.value,
    disabled: isTableViewDay.value
}));

watch(() => generalStore.IsTableViewDay, (newValue) => {
    isTableViewDay.value = newValue;
})
</script>

<template>
    <div class="table_container">
        <DayTable :class="viewDayTable" />
        <WeekTable :class="viewWeekTable" />
    </div>
</template>

<style lang="scss" scoped>
.table_container {
    margin: 1rem;
    display: grid;
    overflow-y: auto;
}

.active {
    transition: transform 1s ease, opacity 1s ease;
    transform: scaleY(1);
    transform: scaleX(1);
    opacity: 1;
}

.disabled {
    transition: transform 0.7s ease, opacity 0.7s ease;
    transform: scaleY(0);
    transform: scaleX(0);
    opacity: 0;
    position: absolute;
    overflow: hidden;
}
</style>





