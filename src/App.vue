<template>
  <div class="app">
    <h1>Habit Tracker</h1>

    <div class="tabs">
      <button :class="{ active: tab === 'habits' }" @click="tab = 'habits'">Habits</button>
      <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">Stats</button>
    </div>

    <HabitList v-if="tab === 'habits'" />
    <StatsView v-if="tab === 'stats'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HabitList from './components/HabitList.vue'
import StatsView from './components/StatsView.vue'

const tab = ref('habits')
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.tabs button {
  padding: 8px 24px;
  border: 2px solid #42b883;
  border-radius: 20px;
  background: white;
  color: #42b883;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.tabs button.active {
  background: #42b883;
  color: white;
}
</style>