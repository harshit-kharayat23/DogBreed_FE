import { createSlice } from "@reduxjs/toolkit";

const diseaseSlice=createSlice({

    name:"diseasePredictor",
    initialState:{
        toggle:false,
    }
    ,
    reducers:{
        toggleDisease:(state)=>{
            state.toggle=!state.toggle;
        }
    }

})
export const {toggleDisease} =diseaseSlice.actions;
export default diseaseSlice.reducer;