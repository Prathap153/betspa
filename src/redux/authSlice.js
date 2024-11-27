import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Login async thunk
export const Login = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }) => {
        const response = await axios.post('https://localhost:7056/api/Authentication/Login', {
            userName: username,
            password: password,
        });

        const token = response.data.token;
        localStorage.setItem('BetAuthToken', token);
        return token;
    }
);

const initialState = {
    token: localStorage.getItem('BetAuthToken') || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('BetAuthToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(Login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
