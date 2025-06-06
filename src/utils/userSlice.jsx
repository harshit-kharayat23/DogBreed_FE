import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        loggedInUser:null,
        
    },
    reducers:{
        addUser:(state,action)=>{
            state.loggedInUser=action.payload;
        },
        removeUser:(state,action)=>{
            state.loggedInUser=null
        },
    }
})
export const {addUser,removeUser} =userSlice.actions;

export default userSlice.reducer;