# Habit Tracker

A web application to track daily habits with streaks and statistics.

## Features

- Add, edit, and delete habits
- Organize habits by category (General, Health, Work, Personal, Sport)
- Filter habits by category
- Daily habit completion tracking
- Automatic streak calculation
- Completion rate tracking
- Weekly and monthly statistics charts
- Activity heatmap (90-day view)
- Data persistence via localStorage

## Planned

- Dark mode
- Responsive design

## Tech Stack

- **Vue 3** (Composition API)
- **Vite**
- **Pinia** — state management
- **Chart.js** — statistics charts
- **Tailwind CSS** — styling
- **localStorage** — data persistence

## Project Structure
```
src/
├── components/
│   ├── HabitForm.vue    # Form to add new habits
│   ├── HabitCard.vue    # Single habit display with edit/delete/toggle
│   ├── HabitList.vue    # List of habits with category filter
│   ├── StatsView.vue    # Weekly/monthly statistics charts
│   └── HeatMap.vue      # 90-day activity heatmap
├── stores/
│   └── habitStore.js    # Pinia store: habit state and business logic
├── App.vue              # Root component with tab navigation
├── main.js              # App entry point
└── style.css            # Tailwind import
```
## Getting Started

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## How It Works

### Data Model
Each habit is stored as an object:
```js
{
  id: 1234567890,
  name: "Morning run",
  category: "Sport",
  createdAt: "2026-06-15T08:00:00.000Z",
  completions: {
    "2026-06-15": true,
    "2026-06-16": true
  }
}
```

### State Management
All habit data and logic lives in `habitStore.js` (Pinia). Components call store actions like `addHabit()`, `toggleHabit()`, `editHabit()`, and `deleteHabit()`, which handle both state updates and persistence to localStorage.

### Streaks
A streak counts consecutive days (including today) where a habit was marked complete. It stops counting as soon as a day is missed.

### Completion Rate
Calculated as: `(days completed) / (days since habit was created) × 100`

### Statistics
`StatsView.vue` aggregates completion data across all habits for the last 7 days (weekly chart) and last 30 days (monthly chart), rendered with Chart.js.

### Heatmap
`HeatMap.vue` shows the last 90 days as a grid, with color intensity based on the average completion rate of that day across all habits.

## Author

ELLAMTI Malak — Internship project at OMAG, supervised by Mustapha Azzouz.
