import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

 
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [Profile , setProfile] = useState(null);
    const user = useSelector(state=>state.auth.userData);


   useEffect(()=>{
        const getUserProfile = async()=>{
            try {

                const currentUser = await axios.get("/api/v1/users/current-user",{
                    withCredentials:true
                })
                if(currentUser.data){
                    dispatch(login(currentUser.data.data));
                    setProfile(currentUser.data.data);
                    console.log(currentUser.data);
                }
            } catch (error) {
                console.log('Error getting user Profile',error);                
            }
        }

        if(!user){
            getUserProfile();
        }else{
            setProfile(user);
        }
    },[user , dispatch])



  return (
    <div className='text-center m-10'>
        {Profile ? ( <div className='text-2xl'>
            <h1>name:{Profile.fullname}</h1>
            <h1>username:{Profile.username}</h1>
            <h1>email:{Profile.email}</h1>
        </div> ) : null }
        <button 
        className='border-2 bg-blue-500 text-white rounded w-25 h-8 m-5 cursor-pointer'
        onClick={()=>{navigate("/edit-profile")}}>Edit Profile</button>
    </div>
  )
}

export default Profile