import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../api/axios";

export default function Requests(){
    const[requests,setRequests]=useState([]);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        fetchRequests();
    },[]);

    const fetchRequests=async()=>{
        try{
            const res=await axiosInstance.get("connections/requests/");
            setRequests(res.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    const respondRequest=async(id,action)=>{
        try{
        await axiosInstance.post(`connections/respond-requests/${id}/`,{
            action:action
        }
        );
        fetchRequests();
    }catch(err){
        console.log(err);
    }
};


    return(
       <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>
            {requests.length===0?(
                <p>No Pending requests</p>
            ):(
                requests.map((req)=>(
                    <div
                    key={req.id}
                    className="bg-white shadow rounded-lg mb-4 flex justify-between items-center "
                    >
                    <h3 className="font-semibold">{req.from_user}</h3>

                    <div className="flex gap-2">
                        <button 
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={()=>respondRequest(req.id,"accept")}
                        >Accept
                        </button>
                        <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={()=>respondRequest(req.id,"reject")}>
                            Reject
                        </button>
                    </div>
                    </div>   
                ))
            )}
       </div>
    )
}