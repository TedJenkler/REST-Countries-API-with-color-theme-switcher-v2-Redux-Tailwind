import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAll = createAsyncThunk(
    'state/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            if (!response) {
                throw new Error('Failed to fetch data');
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: null,
    theme: 'true',
    status: 'loading',
    error: null
};

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
            state.error = null;
        })
        .addCase(getAll.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(getAll.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error;
        })
    }
});

export const { toggleTheme } = stateSlice.actions; 

export default stateSlice.reducer;