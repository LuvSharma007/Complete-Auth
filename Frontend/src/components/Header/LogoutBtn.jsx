import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { clearProfile } from '../../store/profileSlice';



const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = async() =>{
        try {
            await axios.post("/api/v1/users/logout");
            dispatch(logout());
            dispatch(clearProfile());
            alert("User logout successfully !");
            navigate("/");
        } catch (error) {
            console.log("Error while logout user",error);            
        }        
    }
  return (
    <button
      onClick={logoutHandler}
      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  )
}

export default LogoutBtn;