import { configureStore } from "@reduxjs/toolkit";
import diseaseReducer from './diseaseSlice';
import configReducer from "./configSlice";
import userReducer from "./userSlice";
import dogReducer from "./dogSlice";

export const appStore=configureStore({
    reducer:{
        disease:diseaseReducer,
        config:configReducer,
        user:userReducer,
        dog:dogReducer,
    }
})