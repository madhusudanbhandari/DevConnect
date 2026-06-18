import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
});

axiosInstance.interceptors.request.use((config)=>{
    const access=localStorage.getItem("accessToken");

    if(access){
        config.headers.Authorization=`Bearer ${access}`;
    }
    return config;
});
export default axiosInstance;