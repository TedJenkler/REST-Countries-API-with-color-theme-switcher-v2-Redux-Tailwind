import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'true'
};

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        },
    },
});

export const { toggleTheme } = stateSlice.actions; 

export default stateSlice.reducer;