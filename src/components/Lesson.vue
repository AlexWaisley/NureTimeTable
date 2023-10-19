<script setup lang="ts"></script>
<template>
    <div class="lesson">
        <div class="lesson__time">
            <div class="lesson__time-start">7:45</div>
            <div class="lesson__time-end">9:20</div>
        </div>
        <hr>
        <div class="lesson__name">Теорія інформації та кодування</div>
        <hr>
        <div class="lesson__type">Практичне заняття</div>
        <hr>
        <div class="lesson__room">Каб. 1</div>
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