import React, { useState } from "react";
import { loginUser } from "../features/auth/authThunks";
import {useDispatch} from "react-redux";

export default function Login(){
    const[form,setForm]=useState({
        "username":"",
        "password":"",
   } )
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser(form));
    };



    return(
        <div>
        <h1>Login Please!</h1>

        <form onSubmit={handleSubmit}>
            <label >Username:
                <input type="text" name="username" value={form.username} placeholder="Username"  onChange={handleChange} />

            </label>
            <label>Password:
                <input type="password"  name="password" value={form.password} placeholder="Password" onChange={handleChange}/>

            </label>
            <button type="submit">Login</button>
        </form>

        </div>
    )
}