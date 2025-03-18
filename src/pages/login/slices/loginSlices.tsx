import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  phoneNumber: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

const initialState: ProfileState = {
  phoneNumber: '',
  displayName: '',
  email: '',
  photoURL: '',
  uid: ''
};

export const userProfileData = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile: (state: ProfileState, action: PayloadAction<ProfileState>) => {
      state.displayName = action.payload.displayName;
      state.phoneNumber = action.payload.phoneNumber;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.uid = action.payload.displayName;
    },
    updateUserProfile: (state: ProfileState, action: PayloadAction<Partial<ProfileState>>) => {
      Object.assign(state, action.payload);
    }
  }
});

export const { createProfile, updateUserProfile } = userProfileData.actions;

export default userProfileData.reducer;
