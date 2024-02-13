<script setup lang="ts">
import DailySheduleSidebar from './DailySheduleSidebar.vue';
import Table from './Table.vue';

</script>
<template>
    <div class="main">
        <DailySheduleSidebar></DailySheduleSidebar>
        <Table></Table>
    </div>
</template>
<style lang="scss" scoped>
.main {
    display: grid;
    height: 100%;
    gap: 0.5rem;

    @media screen and (min-width:590px) {
        grid-template-columns: 270px 1fr;
        overflow-y: auto;
    }
}
</style>
