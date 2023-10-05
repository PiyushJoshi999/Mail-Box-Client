import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        username: '',
        email: '',
        password: ''
    },

    reducers: {

        updateUserData(state, action){
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.username = action.payload.password;
        }

    }
});

export const userActions = userSlice.actions;

export default userSlice;