<script setup lang="ts">
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import { defineProps, ref, watch } from 'vue';
import { useDateStore } from "../stores/date.ts";
const storeDate = useDateStore();

const pickedDate = ref<number>(storeDate.date);

watch(() => storeDate.date, () => {
    pickedDate.value = storeDate.date;
})

const properti = defineProps({
    tableViewDay: Boolean,
});


</script>

<template>
    <div class="table_container">
        <DayTable :class="{ active: properti.tableViewDay, disabled: !properti.tableViewDay }" :picked-date="pickedDate">
        </DayTable>
        <WeekTable :class="{ active: !properti.tableViewDay, disabled: properti.tableViewDay }" :picked-date="pickedDate">
        </WeekTable>
    </div>
</template>

<style scoped>
.table_container {
    display: grid;
    margin: 1rem;
    padding: 0 1rem;
}

.active {
    animation: fadein 1s linear 1 normal forwards;
}

.disabled {
    animation: fadeout .7s linear 1 normal forwards;
    position: absolute;
    overflow: hidden;
}

@keyframes fadein {
    from {
        height: 0;
        opacity: 0;
    }

    to {
        height: 100%;
        opacity: 1;
    }
}

@keyframes fadeout {
    from {
        height: 100%;
        opacity: 1;
    }

    to {
        height: 0;
        opacity: 0;
    }
}


@media screen and (min-width:590px) {
    .table_container {
        overflow-y: auto;
    }
}
</style>





