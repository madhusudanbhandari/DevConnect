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
        console.log(err);
    }
};