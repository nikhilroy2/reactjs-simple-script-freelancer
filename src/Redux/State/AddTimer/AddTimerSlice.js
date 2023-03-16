import { createSlice } from "@reduxjs/toolkit";
import { addTimer, updateTimer, deleteTimer } from "../../../Api/Api";
export const addTimerSlice = createSlice({
    name: 'add_timer_slice',
    initialState: {
        value: []
    },
    reducers: {
        addTimerList: async (state, action) => {
            //console.log(action)
            const addedTimer = await addTimer(action.payload);
            (state.value).push(addedTimer)

        },
        updateAddTimer: async (state, action) => {
            const { updateIndex, newFormValue } = action.payload;
            const updatedTimersData = state.value.map((timer, i) => {
                if (Number(i) === Number(updateIndex)) {
                    return { ...timer, ...newFormValue };
                }
                return timer;
            });

            console.log(updatedTimersData);

            await updateTimer(updateIndex, newFormValue);
            state.value = updatedTimersData;
        },

        deleteTimerUpdate: async (state, action) => {
            let newData = state.value.filter((v, i) => i !== action.payload);
            await deleteTimer(action.payload)
            state.value = newData;
        }
    }
})

export const { addTimerList, updateAddTimer, deleteTimerUpdate } = addTimerSlice.actions