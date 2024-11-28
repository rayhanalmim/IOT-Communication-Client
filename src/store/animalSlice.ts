// src/store/animalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnimalState {
  animals: { name: string; image: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null,
};

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    fetchAnimalsStart(state) {
      state.loading = true;
    },
    fetchAnimalsSuccess(state, action: PayloadAction<{ name: string; image: string }[]>) {
      state.animals = action.payload;
      state.loading = false;
    },
    fetchAnimalsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchAnimalsStart, fetchAnimalsSuccess, fetchAnimalsFailure } = animalSlice.actions;

export default animalSlice.reducer;
