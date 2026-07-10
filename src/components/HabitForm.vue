<!-- HabitForm: input form to add new habits -->
<template>
  <div class="flex flex-wrap gap-2.5 mb-5 w-full">
    <input
      v-model="habitName"
      placeholder="Enter a new habit..."
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      @keyup.enter="addHabit"
    />
    <select v-model="habitCategory" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <option value="General">General</option>
      <option value="Health">Health</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Sport">Sport</option>
    </select>
    <button
      class="flex-1 px-4 py-2 border-none rounded bg-emerald-500 text-white text-sm cursor-pointer hover:bg-emerald-600"
      @click="addHabit"
    >Add Habit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()
const habitName = ref('')
const habitCategory = ref('General')

function addHabit() {
  if (habitName.value.trim()) {
    store.addHabit(habitName.value.trim(), habitCategory.value)
    habitName.value = ''
    habitCategory.value = 'General'
  }
}
</script>