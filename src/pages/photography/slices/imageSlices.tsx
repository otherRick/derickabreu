// redux/imagesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { downloadMedia } from '../../../api/repository/downloadmedia';
import { filesToDownload } from '../helpers/filesToDownload';

interface iInitialState {
  imageUrls: string[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: iInitialState = {
  imageUrls: [],
  status: 'idle',
  error: null
};

export const fetchImages = createAsyncThunk<string[], void>(
  'images/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const urls = await downloadMedia(filesToDownload);
      return urls || []; // Retorna um array vazio se não houver URLs
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // Aqui você pode adicionar reducers adicionais, caso necessário
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default imagesSlice.reducer;
