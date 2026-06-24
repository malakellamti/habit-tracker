<!-- HabitCard: single habit item with checkbox -->
<template>
  <div class="habit-card">
    <input 
      type="checkbox" 
      :checked="isCompletedToday"
      @change="toggle"
    />
    <span v-if="!isEditing">{{ habit.name }} - {{ habit.category }}</span>

    <input 
      v-if="isEditing"
      v-model="editedName"
      @keyup.enter="saveEdit"
    />
    <select v-if="isEditing" v-model="editedCategory">
      <option value="General">General</option>
      <option value="Health">Health</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Sport">Sport</option>
    </select>

    <span>Streak: {{ store.getStreak(habit.id) }} days</span>
    <span>Completion: {{ store.getCompletionRate(habit.id) }}%</span>  
    <button @click="startEdit" v-if="!isEditing">Edit</button>
    <button @click="saveEdit" v-if="isEditing">Save</button>
    <button @click="confirmDelete">Delete</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const props = defineProps(['habit'])
const store = useHabitStore()

const today = new Date().toISOString().split('T')[0]
const isEditing = ref(false)
const editedName = ref('')
const editedCategory = ref('')

const isCompletedToday = computed(() => {
  return props.habit.completions[today] === true
})

function toggle() {
  store.toggleHabit(props.habit.id, today)
}

function startEdit() {
  isEditing.value = true
  editedName.value = props.habit.name
  editedCategory.value = props.habit.category
}

function saveEdit() {
  store.editHabit(props.habit.id, editedName.value, editedCategory.value)
  isEditing.value = false
}

function confirmDelete() {
  if (confirm('Are you sure you want to delete this habit?')) {
    store.deleteHabit(props.habit.id)
  }
}
</script>
<style scoped>
.habit-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
}

.habit-card span {
  font-size: 0.95rem;
  color: #333;
}

.habit-card input[type="text"],
.habit-card select {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.habit-card button {
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 0.85rem;
}

.habit-card button:hover {
  background: #e8e8e8;
}
</style>