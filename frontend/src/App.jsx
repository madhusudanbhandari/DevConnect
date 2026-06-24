import {BrowserRouter, Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CompleteProfile from "./pages/CompleteProfile"
import Dashboard from "./pages/Dashboard"
import AddSkill from "./pages/AddSkill"
import FindDeveloper from "./pages/FindDeveloper"
import Requests from "./pages/Requests"
import Post from "./components/Post"

export default function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/complete-profile" element={<CompleteProfile/>}></Route>
            <Route path="/add-skill" element={<AddSkill/>}></Route>
            <Route path="/find-developer" element={<FindDeveloper/>}></Route>
            <Route path="/requests" element={<Requests/>}></Route>
            <Route path="/post" element={<Post/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}