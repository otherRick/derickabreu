import { createSlice } from '@reduxjs/toolkit';

interface iInitialState {
  isLogged: boolean;
}

const initialState: iInitialState = {
  isLogged: false
};

export const userCurrentStatus = createSlice({
  initialState,
  name: ' User- Current - Status',
  reducers: {
    onLineStatus: (state, action) => {
      state.isLogged = action.payload;
    }
  }
});

export const { onLineStatus } = userCurrentStatus.actions;

export default userCurrentStatus.reducer;
