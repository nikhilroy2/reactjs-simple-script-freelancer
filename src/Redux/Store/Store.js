import { configureStore } from '@reduxjs/toolkit';

import { addTimerSlice } from '../State/AddTimer/AddTimerSlice';
import { addMeditationSlice } from '../State/AddMeditationSlice/AddMeditationSlice';
export const store = configureStore({
    reducer: {
        addTimer: addTimerSlice.reducer,
        addMeditation: addMeditationSlice.reducer
    }
});
