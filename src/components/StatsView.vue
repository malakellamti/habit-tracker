<template>
  <div class="p-4 w-full">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">Statistics</h2>

    <div class="mb-8">
      <h3 class="mb-2.5 text-gray-600 text-base">Weekly Completion Rate</h3>
      <canvas ref="weeklyChart" class="max-h-[250px]"></canvas>
    </div>

    <div class="mb-8">
      <h3 class="mb-2.5 text-gray-600 text-base">Monthly Completion Rate</h3>
      <canvas ref="monthlyChart" class="max-h-[250px]"></canvas>
    </div>

    <HeatMap />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHabitStore } from '../stores/habitStore'
import { Chart, registerables } from 'chart.js'
import HeatMap from './HeatMap.vue'

Chart.register(...registerables)

const store = useHabitStore()
const weeklyChart = ref(null)
const monthlyChart = ref(null)

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

function getLast30Days() {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

function getCompletionRate(days) {
  return days.map(date => {
    const total = store.habits.length
    if (total === 0) return 0
    const completed = store.habits.filter(h => h.completions[date]).length
    return Math.round((completed / total) * 100)
  })
}

onMounted(() => {
  const last7 = getLast7Days()
  const last30 = getLast30Days()

  new Chart(weeklyChart.value, {
    type: 'bar',
    data: {
      labels: last7.map(d => d.slice(5)),
      datasets: [{
        label: 'Completion %',
        data: getCompletionRate(last7),
        backgroundColor: '#42b883'
      }]
    },
    options: {
      scales: { y: { min: 0, max: 100 } }
    }
  })

  new Chart(monthlyChart.value, {
    type: 'line',
    data: {
      labels: last30.map(d => d.slice(5)),
      datasets: [{
        label: 'Completion %',
        data: getCompletionRate(last30),
        borderColor: '#42b883',
        fill: true,
        backgroundColor: 'rgba(66,184,131,0.2)'
      }]
    },
    options: {
      scales: { y: { min: 0, max: 100 } }
    }
  })
})
</script>