// redux/slices/spotifyAuthSlice.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  expirationDate: null,
};

export const spotifyAuthSlice = createSlice({
  name: 'spotifyAuth',
  initialState,
  reducers: {
    setSpotifyTokens(state, action) {
      const {accessToken, refreshToken, expirationDate} = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expirationDate = expirationDate;
    },
    clearSpotifyTokens(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.expirationDate = null;
    },
  },
});

export const {setSpotifyTokens, clearSpotifyTokens} = spotifyAuthSlice.actions;
