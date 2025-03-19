import { createSlice } from '@reduxjs/toolkit';

interface filesProps {
  url: string;
  title: string;
  price: number;
}

interface initialStateProps {
  files: filesProps;
  totalPrice: number;
  user: string;
}

const initialState: initialStateProps = {
  files: { url: '', title: '', price: 0 },
  totalPrice: 0,
  user: ''
};

export const cartManager = createSlice({
  initialState,
  name: 'Cart-manager',
  reducers: {
    addCart: (state, action) => {
      state.files = action.payload;
    }
  }
});

export const { addCart } = cartManager.actions;

export default cartManager.reducer;
