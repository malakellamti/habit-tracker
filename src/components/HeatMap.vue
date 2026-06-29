<template>
  <div class="mt-8">
    <h3 class="mb-2.5 text-gray-600 text-base">Activity Heatmap</h3>
    <div class="grid grid-cols-13 gap-1">
      <div
        v-for="day in days"
        :key="day.date"
        class="w-full aspect-square rounded-sm"
        :style="{ backgroundColor: getColor(day.rate) }"
        :title="`${day.date}: ${day.rate}%`"
      ></div>
    </div>
    <div class="flex items-center gap-1.5 mt-2 text-xs text-gray-600">
      <span>0%</span>
      <div class="flex gap-1">
        <div
          v-for="n in [0, 25, 50, 75, 100]"
          :key="n"
          class="w-3.5 h-3.5 rounded-sm"
          :style="{ backgroundColor: getColor(n) }"
        ></div>
      </div>
      <span>100%</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHabitStore } from '../stores/habitStore'

const store = useHabitStore()

const days = computed(() => {
  const result = []
  for (let i = 89; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const date = d.toISOString().split('T')[0]
    const total = store.habits.length
    const completed = total === 0 ? 0 : store.habits.filter(h => h.completions[date]).length
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100)
    result.push({ date, rate })
  }
  return result
})

function getColor(rate) {
  if (rate === 0) return '#ebedf0'
  if (rate <= 25) return '#c6e48b'
  if (rate <= 50) return '#7bc96f'
  if (rate <= 75) return '#239a3b'
  return '#196127'
}
</script>