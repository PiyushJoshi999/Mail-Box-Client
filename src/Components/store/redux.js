import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {user: userSlice.reducer, auth: authSlice.reducer}
});

export default store;