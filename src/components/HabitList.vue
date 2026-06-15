<template>
  <div class="habit-list">
    <HabitForm />
    <div v-if="store.habits.length === 0">
      <p>No habits yet. Add one above!</p>
    </div>
    <HabitCard 
      v-for="habit in store.habits" 
      :key="habit.id" 
      :habit="habit" 
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHabitStore } from '../stores/habitStore'
import HabitForm from './HabitForm.vue'
import HabitCard from './HabitCard.vue'

const store = useHabitStore()

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>