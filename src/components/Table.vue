<script setup lang="ts">
import WeekTable from './SingleWeekTable.vue';
import DayTable from './SingleDayTable.vue';
import { ref, watch } from 'vue';

import { useGeneralStore } from '../stores/generalInfo';

const generalStore = useGeneralStore();

const isTableViewDay = ref<Boolean>(generalStore.IsTableViewDay);

watch(() => generalStore.IsTableViewDay, () => {
    isTableViewDay.value = generalStore.IsTableViewDay;
})
</script>

<template>
    <div class="table_container">
        <DayTable v-if="isTableViewDay" class="active"></DayTable>
        <WeekTable v-else class="active"></WeekTable>
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





