// Pinia store for managing habits and localStorage persistence
import { defineStore } from 'pinia'

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: []
  }),

  actions: {
    addHabit(name, category = 'General') {
      this.habits.push({
        id: Date.now(),
        name: name,
        category: category,
        createdAt: new Date().toISOString(),
        completions: {}
      })
      this.saveToLocalStorage()
    },

    toggleHabit(habitId, date) {
      const habit = this.habits.find(h => h.id === habitId)
      if (habit) {
        if (habit.completions[date]) {
          delete habit.completions[date]
        } else {
          habit.completions[date] = true
        }
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('habits', JSON.stringify(this.habits))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('habits')
      if (saved) {
        this.habits = JSON.parse(saved)
      }
    },
    deleteHabit(habitId) {
      this.habits = this.habits.filter(h => h.id !== habitId)
      this.saveToLocalStorage()
    },
    editHabit(habitId, newName) {
      const habit = this.habits.find(h => h.id === habitId)
      if (habit) {
        habit.name = newName
        this.saveToLocalStorage()
      }
    },
    getStreak(habitId) {
      const habit = this.habits.find(h => h.id === habitId)
      if (!habit) return 0

      let streak = 0
      let date = new Date()

      while (true) {
        const dateStr = date.toISOString().split('T')[0]
        if (habit.completions[dateStr]) {
          streak++
          date.setDate(date.getDate() - 1)
        } else {
          break
        }
      }
      return streak
    },
    getCompletionRate(habitId) {
      const habit = this.habits.find(h => h.id === habitId)
      if (!habit) return 0

      const totalDays = Object.keys(habit.completions).length
      if (totalDays === 0) return 0

      const createdAt = new Date(habit.createdAt)
      const today = new Date()
      const daysSinceCreation = Math.floor(
        (today - createdAt) / (1000 * 60 * 60 * 24)
      ) + 1

      return Math.round((totalDays / daysSinceCreation) * 100)
    },

  }
})