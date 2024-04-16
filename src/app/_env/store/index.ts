import { sessionReducer } from '@albomoni/entities/session';
import { favoritesReducer } from '@albomoni/features/add-to-favorites/model/favorites-store';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    favorites: favoritesReducer,
  },
});
