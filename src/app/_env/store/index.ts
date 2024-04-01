import { sessionReducer } from '@albomoni/entities/session';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});
