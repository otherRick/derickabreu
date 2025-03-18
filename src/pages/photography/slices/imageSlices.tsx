import { createSlice } from '@reduxjs/toolkit';

export interface singleImageState {
  click: string;
}

const initialState: singleImageState = {
  click: ''
};

export const singleImageData = createSlice({
  initialState,
  name: 'single-image-slice',
  reducers: {
    clickCounter: (state, action) => {
      state.click = action.payload;
    }
  }
});

export default singleImageData.reducer;
