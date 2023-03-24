import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth-slice';
import taskReducer from '../slices/task-slice';
import toastReducer from '../slices/toast-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
