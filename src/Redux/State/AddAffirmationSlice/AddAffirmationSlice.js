import { createSlice } from "@reduxjs/toolkit";

export const addAffirmationSlice = createSlice({
    name: 'add_affirmation_slice',
    initialState: {
        value: []
    },
    reducers: {
        addAffirmationList: (state, action) => {
            //console.log(action)
            (state.value).push(action.payload)
        },
        updateAddAffirmation: (state, action) => {
            const { updateIndex, newFormValue } = action.payload;
            const updateData = state.value.map((v, i) => {
                if (Number(i) === Number(updateIndex)) {
                    return { ...v, ...newFormValue };
                }
                return v;
            });
            state.value = updateData;
        },
        deleteAffirmationUpdate: (state, action) => {
            let newData = state.value.filter((v, i) => i !== action.payload);
            state.value = newData;
        }
    }
})

export const { addAffirmationList, updateAddAffirmation, deleteAffirmationUpdate } = addAffirmationSlice.actions