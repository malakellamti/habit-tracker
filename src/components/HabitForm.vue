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
<style scoped>
.habit-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.habit-form input[type="text"] {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}

.habit-form select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}

.habit-form button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
}

.habit-form button:hover {
  background: #389b6f;
}
</style>