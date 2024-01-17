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

try {
    if (properti.lesson !== undefined) {
        thisLesson.value = properti.lesson;

        watchEffect(() => {
            if (properti.lesson !== undefined) {
                thisLesson.value = properti.lesson;
            }
        });
    }
    else {
        throw new Error("Lesson properti in lesson component is undefined");
    }
} catch (error) {
    console.log(error);
}
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

<style scoped>
.lesson {
    display: grid;
    grid-template-columns: 2fr 1fr 5fr 1fr 5fr 1fr 2fr;
    place-items: center;
    padding: 10px;
    font-size: 1.25rem;
    background-color: #EADDFF;
    color: #21005D;
    border-radius: 10px;
    box-shadow: 1.5px 1.5px 1.5px rgba(33, 0, 93, 0.34)
}

.lesson__info {
    display: grid;
    padding: .1rem;
    text-align: center;
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