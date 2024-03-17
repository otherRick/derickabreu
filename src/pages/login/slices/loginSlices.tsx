import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  phoneNumber: string;
  displayName: string;
  photoURL: string;
  uid: string;
}

const initialState: ProfileState = {
  phoneNumber: '',
  displayName: '',
  photoURL: '',
  uid: ''
};

export const userProfileData = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile: (state, action) => {
      state.displayName = action.payload.displayName;
      state.phoneNumber = action.payload.phoneNumber;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.displayName;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      // Atualiza apenas os campos fornecidos na action payload
      Object.assign(state, action.payload);
    }
  }
});

export const { createProfile, updateUserProfile } = userProfileData.actions;

export default userProfileData.reducer;
