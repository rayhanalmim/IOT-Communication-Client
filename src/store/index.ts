// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import animalReducer from './animalSlice'; // Your slice reducer

const store = configureStore({
  reducer: {
    animals: animalReducer, // Add the animal reducer
  },
});

export default store;
