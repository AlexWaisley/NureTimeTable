<script setup lang="ts"></script>
<template>
    <header>
        <div class="logo">
            <img src="../assets/logo.jpg" alt="logo" height="80px" />
            <span>NureTable</span>
        </div>
        <div class="date">
            <span>19 dec 2023</span>
        </div>
        <div class="options">
            <button class="list">DAY</button>
        </div>
    </header>
</template>
<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    flex: 1;
}

.logo img {
    margin-right: 10px;
}

.logo span {
    font-size: 1.5rem;
    font-weight: 700;
}

.date {
    display: flex;
    font-size: 2rem;
    font-weight: 700;
    flex: 2;
    justify-content: center;
    align-items: center;
}

.options {
    display: flex;
    flex: 1;
    justify-content: end;
}
</style>

