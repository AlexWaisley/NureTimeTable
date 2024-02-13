<script setup lang="ts">
import { useGeneralStore } from '../stores/generalInfo';
import { useTableDataStore } from '../stores/tableData';

const generalStore = useGeneralStore();
const tableDataStore = useTableDataStore();
</script>

<template>
    <div class="current_day_info">
        <div class="day__data">
            <span class="current__weekday">{{ generalStore.CurrentDate.format("MMMM DD") }}</span>
            <br>
            <br>
            <span class="current__weekday">{{ generalStore.CurrentDate.format("dddd") }}</span>
        </div>

        <div class="lesson_list" v-for="lesson in tableDataStore.tableForCurrentDay">
            <hr>
            <span class="lesson_list_text">{{ lesson.StartTime }}</span>
            <br>
            <br>
            <span class="lesson_list_text">{{ lesson.Theme }}</span>
            <br>
            <br>
            <span class="lesson_list_text">{{ lesson.Type }}</span>
            <br>
            <br>
            <a :href="lesson.ConnectionLink" target="_blank" class="lesson_list_text">Connect</a>
            <br>
            <br>
            <a :href="lesson.CheckoutLink" target="_blank" class="lesson_list_text">Checkout</a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../styles/mixin' as mixin;
@use '../styles/variables' as variables;

.current_day_info {
    @include mixin.gridCenterText;
    @include mixin.standartBorderShadow;
    background-color: variables.$table-bg-color;
    padding: 1rem;
    margin: 1rem;

    @media screen and (min-width:590px) {
        overflow-y: auto;
        min-width: 200px;
    }
}

.current__weekday {
    font-weight: 600;
}
</style>





