<script setup lang="ts">
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import { ref, watch } from 'vue';

import { useTableViewInfo } from "../stores/tableViewInfo.ts";

const tableViewInfo = useTableViewInfo();

const isTableViewDay = ref<Boolean>(tableViewInfo.IsTableViewDay);

watch(() => tableViewInfo.IsTableViewDay, () => {
    isTableViewDay.value = tableViewInfo.IsTableViewDay;
})

</script>

<template>
    <div class="table_container">
        <DayTable :class="{ active: isTableViewDay, disabled: !isTableViewDay }">
        </DayTable>
        <WeekTable :class="{ active: !isTableViewDay, disabled: isTableViewDay }">
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





