import { createSlice } from '@reduxjs/toolkit';
interface iScrolling {
  scrolling: boolean;
}
const initialState: iScrolling = {
  scrolling: true
};

export const scrollingToggle = createSlice({
  initialState,
  name: 'scrolling-state',
  reducers: {
    scrollingState: (state, action) => {
      state.scrolling = action.payload;
    }
  }
});

export default scrollingToggle.reducer;

export const { scrollingState } = scrollingToggle.actions;
