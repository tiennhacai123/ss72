import reducerUser from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store= configureStore({
    reducer:{
        user:reducerUser
    }
})