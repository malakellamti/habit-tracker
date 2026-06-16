<!-- HabitCard: single habit item with checkbox -->
<template>
  <div class="habit-card">
    <input 
      type="checkbox" 
      :checked="isCompletedToday"
      @change="toggle"
    />
    <span>{{ habit.name }}</span>
    <button @click="store.deleteHabit(habit.id)">Delete</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const props = defineProps(['habit'])
const store = useHabitStore()

const today = new Date().toISOString().split('T')[0]

const isCompletedToday = computed(() => {
  return props.habit.completions[today] === true
})

function toggle() {
  store.toggleHabit(props.habit.id, today)
}
</script>