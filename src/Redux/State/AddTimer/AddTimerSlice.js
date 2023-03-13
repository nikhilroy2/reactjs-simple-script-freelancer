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
        deleteTimerUpdate: (state, action) => {
            let newData = state.value.filter((v, i) => i !== action.payload);
            state.value = newData;
        }
    }
})

export const { addTimerList, deleteTimerUpdate } = addTimerSlice.actions