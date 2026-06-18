import {BrowserRouter, Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

export default function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}