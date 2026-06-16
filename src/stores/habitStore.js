// Pinia store for managing habits and localStorage persistence
import { defineStore } from 'pinia'

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: []
  }),

  actions: {
    addHabit(name) {
      this.habits.push({
        id: Date.now(),
        name: name,
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
    
  }
})