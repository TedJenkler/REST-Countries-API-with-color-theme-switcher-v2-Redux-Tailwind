import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: null
};

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
});

export default stateSlice.reducer;