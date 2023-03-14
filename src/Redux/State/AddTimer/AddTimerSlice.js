import { createSlice } from "@reduxjs/toolkit";

export const addTimerSlice = createSlice({
    name: 'add_timer_slice',
    initialState: {
        value: []
    },
    reducers: {
        addTimerList: (state, action) => {
            //console.log(action)
            (state.value).push(action.payload)
        },
        updateAddTimer: (state, action) => {
            const { updateIndex, newFormValue } = action.payload;
            const updatedTimers = state.value.map((timer, i) => {
                if (Number(i) === Number(updateIndex)) {
                    return { ...timer, ...newFormValue };
                }
                return timer;
            });
            console.log(updatedTimers)
            state.value = updatedTimers;
        },
        deleteTimerUpdate: (state, action) => {
            let newData = state.value.filter((v, i) => i !== action.payload);
            state.value = newData;
        }
    }
})

export const { addTimerList, updateAddTimer, deleteTimerUpdate } = addTimerSlice.actions