<!-- HabitList: displays all habits -->
<template>
  <div class="habit-list">
    <HabitForm />
    
    <select v-model="selectedCategory">
      <option value="All">All</option>
      <option value="General">General</option>
      <option value="Health">Health</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Sport">Sport</option>
    </select>

    <div v-if="filteredHabits.length === 0">
      <p>No habits yet. Add one above!</p>
    </div>
    <HabitCard 
      v-for="habit in filteredHabits" 
      :key="habit.id" 
      :habit="habit" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHabitStore } from '../stores/habitStore'
import HabitForm from './HabitForm.vue'
import HabitCard from './HabitCard.vue'

const store = useHabitStore()
const selectedCategory = ref('All')

const filteredHabits = computed(() => {
  if (selectedCategory.value === 'All') return store.habits
  return store.habits.filter(h => h.category === selectedCategory.value)
})

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>