import { configureStore } from '@reduxjs/toolkit';
import userProfileData from '../pages/login/slices/loginSlices';
import singleImageData from '../pages/photography/slices/imageSlices';
import scrollingToggle from '../components/layout/slices/layoutSlices';

export const store = configureStore({
  reducer: {
    profile: userProfileData,
    imageData: singleImageData,
    layout: scrollingToggle
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
