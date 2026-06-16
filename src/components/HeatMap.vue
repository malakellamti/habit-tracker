<template>
  <div class="heatmap">
    <h3>Activity Heatmap</h3>
    <div class="grid">
      <div
        v-for="day in days"
        :key="day.date"
        class="cell"
        :style="{ backgroundColor: getColor(day.rate) }"
        :title="`${day.date}: ${day.rate}%`"
      ></div>
    </div>
    <div class="legend">
      <span>0%</span>
      <div class="legend-cells">
        <div class="cell" v-for="n in [0,25,50,75,100]" :key="n" :style="{ backgroundColor: getColor(n) }"></div>
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

<style scoped>
.heatmap { margin-top: 2rem; }
h3 { margin-bottom: 10px; color: #555; }
.grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 4px;
}
.cell {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
}
.legend {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.75rem;
  color: #555;
}
.legend-cells {
  display: flex;
  gap: 4px;
}
.legend-cells .cell {
  width: 14px;
  height: 14px;
}
</style>