<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Lesson } from '../models';

const properti = defineProps({
    lesson: Object as () => Lesson,
});

const thisLesson = ref<Lesson>({
    ThemeId: "-",
    Theme: "-",
    TypeId: "-",
    Type: "-",
    Room: "-",
    StartTime: "-",
    EndTime: "-",
    StartDate: "-",
    ConnectionLink: "-",
    CheckoutLink: "-"
});

watchEffect(() => {
    if (properti.lesson) {
        thisLesson.value = { ...properti.lesson };
    } else {
        console.error("Lesson properti in lesson component is undefined");
    }
});
</script>
<template>
    <div class="lesson">
        <div class="lesson__info">
            <div class="lesson__time-start">{{ thisLesson.StartTime }}</div>
            <div class="lesson__time-end">{{ thisLesson.EndTime }}</div>
        </div>
        <hr>
        <div class="lesson__info">
            <span class="lesson__info__shorted">{{ thisLesson.Theme }}</span>
        </div>
        <hr>
        <div class="lesson__info">
            <span class="lesson__info__shorted">{{ thisLesson.Type }}</span>
        </div>
        <hr>
        <div class="lesson__info">
            <span>{{ thisLesson.Room }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixin' as mixin;
@use '../styles/variables' as variables;

.lesson {
    @include mixin.gridFullCenter;
    @include mixin.standartBorderShadow;
    grid-template-columns: 2fr 1fr 5fr 1fr 5fr 1fr 2fr;
    background-color: variables.$table-bg-color;
    padding: 10px;
    margin: 1.5px;
    font-size: 1.25rem;
}

.lesson__info {
    @include mixin.gridCenterText;
    padding: .1rem;
}

.lesson__info__shorted {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

hr {
    height: 100%
}
</style>