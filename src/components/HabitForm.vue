<!-- HabitForm: input form to add new habits -->
<template>
  <div class="habit-form">
    <input 
      v-model="habitName" 
      placeholder="Enter a new habit..."
      @keyup.enter="addHabit"
    />
    <button @click="addHabit">Add Habit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()
const habitName = ref('')

function addHabit() {
  if (habitName.value.trim()) {
    store.addHabit(habitName.value.trim())
    habitName.value = ''
  }
}
</script>