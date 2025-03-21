import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface addedFilesProps {
  url?: string;
  name?: string;
  price?: number;
}

interface InitialStateProps {
  files: addedFilesProps[];
  totalPrice: number;
  user: string;
}

const initialState: InitialStateProps = {
  files: [],
  totalPrice: 0,
  user: ''
};

export const cartManager = createSlice({
  name: 'Cart-manager',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<addedFilesProps>) => {
      state.files.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const index = state.files.findIndex((item) => item.name === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.files[index].price || 0;
        state.files.splice(index, 1); // Remove o item encontrado
      }
    }
  }
});

export const { addCart, removeCart } = cartManager.actions;
export default cartManager.reducer;
