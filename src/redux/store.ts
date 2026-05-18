import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from './authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';


const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;