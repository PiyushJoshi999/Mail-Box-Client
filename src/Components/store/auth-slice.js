import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthenticated: false},
    reducers: {

        isLoggedIn(state){
            state.isAuthenticated = true;
        },

        isLoggedOut(state){
            state.isAuthenticated = false;
        }

    }
});

export const authActions = authSlice.actions;
export default authSlice; 