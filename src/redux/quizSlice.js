

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectCategory(state, action) {
      console.log('Selecting Category:', action.payload);
      state.selectedCategory = action.payload;
    },
  },
});


export const { selectCategory } = quizSlice.actions;
export default quizSlice.reducer;
