import { configureStore } from '@reduxjs/toolkit';

import { addTimerSlice } from '../State/AddTimer/AddTimerSlice';
export const store = configureStore({
    reducer: {
        addTimer: addTimerSlice.reducer
    }
});
