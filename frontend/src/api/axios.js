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



axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status===401){
            localStorage.removeItem("accessToken");
            window.location.href="/";
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;