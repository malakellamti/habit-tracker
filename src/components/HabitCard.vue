<!-- HabitCard: single habit item with checkbox -->
<template>
  <div class="habit-card">
    <input 
      type="checkbox" 
      :checked="isCompletedToday"
      @change="toggle"
    />
    <span v-if="!isEditing">{{ habit.name }}</span>
    <input 
      v-if="isEditing"
      v-model="editedName"
      @keyup.enter="saveEdit"
    />
    <span>Streak: {{ store.getStreak(habit.id) }} days</span>
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

const isCompletedToday = computed(() => {
  return props.habit.completions[today] === true
})

function toggle() {
  store.toggleHabit(props.habit.id, today)
}

function startEdit() {
  isEditing.value = true
  editedName.value = props.habit.name
}

function saveEdit() {
  store.editHabit(props.habit.id, editedName.value)
  isEditing.value = false
}

function confirmDelete() {
  if (confirm('Are you sure you want to delete this habit?')) {
    store.deleteHabit(props.habit.id)
  }
}
</script>