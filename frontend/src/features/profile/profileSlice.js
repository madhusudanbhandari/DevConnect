import { createSlice } from "@reduxjs/toolkit";
import axios, { create } from "axios";

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        data:null,
    },
    reducers:{
        setProfile:(state,action)=>{
            state.data=action.payload;
        },
        updateProfile:(state,action)=>{
            state.data=action.payload;
        },
    },
});

export const{setProfile,updateProfile}=profileSlice.actions;
export default profileSlice.reducer;