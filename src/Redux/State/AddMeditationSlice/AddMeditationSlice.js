import { createSlice } from "@reduxjs/toolkit";

export const addMeditationSlice = createSlice({
    name: 'add_meditation_slice',
    initialState: {
        value: []
    },
    reducers: {
        addMeditationList: (state, action) => {
            //console.log(action)
            (state.value).push(action.payload)
        },
        updateAddMeditation: (state, action) => {
            const { updateIndex, newFormValue } = action.payload;
            const updatedMetidations = state.value.map((v, i) => {
                if (Number(i) === Number(updateIndex)) {
                    return { ...v, ...newFormValue };
                }
                return v;
            });
            console.log(updatedMetidations)
            state.value = updatedMetidations;
        },
        deleteMeditationUpdate: (state, action) => {
            let newData = state.value.filter((v, i) => i !== action.payload);
            state.value = newData;
        }
    }
})

export const { addMeditationList, updateAddMeditation, deleteMeditationUpdate } = addMeditationSlice.actions