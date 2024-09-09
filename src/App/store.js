// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

// Buat store Redux dan masukkan reducer untuk tasks
export const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Tambahkan tasks reducer
  },
});
