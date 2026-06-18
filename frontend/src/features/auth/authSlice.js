import {createSlice} from "@reduxjs/toolkit";


const initialState={
    user:null,
    accessToken:localStorage.getItem("accessToken")  || null,
    isAuthenticated:false,

};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user=action.payload.user;
            state.accessToken=action.payload.accessToken;
            state.isAuthenticated=true;

            localStorage.setItem("accessToken",action.payload.accessToken);

            
        },
        logout:(state)=>{
            state.user=null;
            state.accessToken=null;
            state.isAuthenticated=false;
            localStorage.removeItem("accessToken");
        },
    },
});

export const{loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;