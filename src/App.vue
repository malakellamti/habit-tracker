<template>
  <div :class="darkMode ? 'dark' : ''" class="w-full">
    <div class="max-w-[600px] mx-auto flex flex-col items-center font-sans bg-gray-100 dark:bg-gray-900 min-h-screen p-5">
      <div class="flex justify-between items-center w-full mb-5">
        <h1 class="text-gray-800 dark:text-gray-100 text-2xl sm:text-3xl font-semibold">Habit Tracker</h1>
        <button
          @click="darkMode = !darkMode"
          class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm cursor-pointer"
        >{{ darkMode ? 'Light' : 'Dark' }}</button>
      </div>

      <div class="flex gap-2.5 mb-5 justify-center w-full">
        <button
          :class="tab === 'habits' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-emerald-500'"
          class="px-6 py-2 border-2 border-emerald-500 rounded-full cursor-pointer text-base transition-all"
          @click="tab = 'habits'"
        >Habits</button>
        <button
          :class="tab === 'stats' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-emerald-500'"
          class="px-6 py-2 border-2 border-emerald-500 rounded-full cursor-pointer text-base transition-all"
          @click="tab = 'stats'"
        >Stats</button>
      </div>

      <HabitList v-if="tab === 'habits'" />
      <StatsView v-if="tab === 'stats'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HabitList from './components/HabitList.vue'
import StatsView from './components/StatsView.vue'

const tab = ref('habits')
const darkMode = ref(false)
</script>