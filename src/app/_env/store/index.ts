import { favoritesReducer } from '@albomoni/features/add-to-favorites/model/favorites-store';
import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from './session-store';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    favorites: favoritesReducer,
  },
});
