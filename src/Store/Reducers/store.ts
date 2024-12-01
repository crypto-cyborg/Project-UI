import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarSlice';
import chartReducer from './chartSlice';
import profileReducer from './profileSlice';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sideBar: sideBarReducer,
        chart: chartReducer,
        profile: profileReducer,
        admin: adminReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;