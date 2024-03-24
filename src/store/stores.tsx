import { configureStore } from '@reduxjs/toolkit';
import userProfileData from '../pages/login/slices/loginSlices';

import scrollingToggle from '../components/layout/slices/layoutSlices';
import userCurrentStatus from '../components/layout/slices/userStatusSlice';
import imagesSlice from '../pages/photography/slices/imageSlices';

export const store = configureStore({
  reducer: {
    profile: userProfileData,
    layout: scrollingToggle,
    userStatus: userCurrentStatus,
    images: imagesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
