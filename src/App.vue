<template>
  <div class="max-w-[600px] mx-auto flex flex-col items-center font-sans bg-gray-100 min-h-screen p-5">
    <h1 class="text-center mb-5 text-gray-800 text-3xl font-semibold">Habit Tracker</h1>

    <div class="flex gap-2.5 mb-5 justify-center">
      <button
        :class="tab === 'habits' ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-500'"
        class="px-6 py-2 border-2 border-emerald-500 rounded-full cursor-pointer text-base transition-all"
        @click="tab = 'habits'"
      >Habits</button>
      <button
        :class="tab === 'stats' ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-500'"
        class="px-6 py-2 border-2 border-emerald-500 rounded-full cursor-pointer text-base transition-all"
        @click="tab = 'stats'"
      >Stats</button>
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