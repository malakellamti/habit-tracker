<!-- HabitCard: single habit item with checkbox -->
<template>
  <div class="flex items-center gap-3 px-3.5 py-2.5 mb-2 bg-white border border-gray-300 rounded-md w-full">
    <input
      type="checkbox"
      :checked="isCompletedToday"
      @change="toggle"
    />
    <span v-if="!isEditing" class="text-sm text-gray-800">{{ habit.name }} - {{ habit.category }}</span>

    <input
      v-if="isEditing"
      v-model="editedName"
      class="px-2 py-1 border border-gray-300 rounded"
      @keyup.enter="saveEdit"
    />
    <select v-if="isEditing" v-model="editedCategory" class="px-2 py-1 border border-gray-300 rounded">
      <option value="General">General</option>
      <option value="Health">Health</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Sport">Sport</option>
    </select>

    <span class="text-sm text-gray-800">Streak: {{ store.getStreak(habit.id) }} days</span>
    <span class="text-sm text-gray-800">Completion: {{ store.getCompletionRate(habit.id) }}%</span>
    <button
      v-if="!isEditing"
      class="px-2.5 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm"
      @click="startEdit"
    >Edit</button>
    <button
      v-if="isEditing"
      class="px-2.5 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm"
      @click="saveEdit"
    >Save</button>
    <button
      class="px-2.5 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm"
      @click="confirmDelete"
    >Delete</button>
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