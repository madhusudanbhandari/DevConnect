import axiosInstance from "../../api/axios";
import { loginSuccess } from "./authSlice";

export const loginUser=(form)=>async(dispatch)=>{
    try{
        const res=await axiosInstance.post("auth/login/",{
            username:form.username,
            password:form.password,
        });
        dispatch(
            loginSuccess({
                user:form.username,
                accessToken:res.data.access,
            })
        );    
        
    }catch(err){
        throw err;
    }
};


export const registerUser=(form)=>async(dispatch)=>{
    try{
        await axiosInstance.post("auth/register/",{
            username:form.username,
            email:form.email,
            password:form.password,

        });
        // const loginRes=await axiosInstance.post("auth/login/",{
        //     username:form.username,
        //     password:form.password,
        // });
        // dispatch(
        //     loginSuccess({
        //         user:form.username,
        //         accessToken:loginRes.data.access,
        //     })
        // );
    }catch(err){
        console.log("Registration error:", err);
        console.log(err.response?.data);
        throw err;
    }

};