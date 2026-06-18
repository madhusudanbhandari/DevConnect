import axiosInstance from "../../api/axios";
import { setProfile } from "./profileSlice";

export const fetchProfile=()=>async(dispatch)=>{
    const res=await axiosInstance.get("profiles/profile/");
    dispatch(setProfile(res.data));
}