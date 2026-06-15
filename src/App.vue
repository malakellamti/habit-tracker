<template>
  <div class="app">
    <h1>Habit Tracker</h1>
    <HabitList />
  </div>
</template>

<script setup>
import HabitList from './components/HabitList.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.app {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
</style>