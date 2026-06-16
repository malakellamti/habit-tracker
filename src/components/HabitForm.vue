<!-- HabitForm: input form to add new habits -->
<template>
  <div class="habit-form">
    <input 
      v-model="habitName" 
      placeholder="Enter a new habit..."
      @keyup.enter="addHabit"
    />
    <select v-model="habitCategory">
      <option value="General">General</option>
      <option value="Health">Health</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Sport">Sport</option>
    </select>
    <button @click="addHabit">Add Habit</button>
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