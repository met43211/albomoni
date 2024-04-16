/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
  },
});

export const { reducer: favoritesReducer } = favoritesSlice;
