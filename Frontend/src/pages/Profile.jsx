import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import axios from 'axios'

const Profile = () => {

 
    const dispatch = useDispatch();
    const [Profile , SetProfile] = useState(null);
    const userStatus = useSelector(state => state.auth.status)


    useEffect(()=>{
        const getUserProfile = async()=>{
            try {
                const currentUser = await axios.get("/api/v1/users/current-user")
                if(currentUser.data){
                    dispatch(login(currentUser.data));
                    SetProfile(currentUser.data.data);
                    console.log(currentUser.data);
                }
            } catch (error) {
                console.log('Error getting user Profile',error);                
            }
        }
        getUserProfile();
    },[])

  return (
    <div>
        {Profile ? ( <div>
            <h1>name:{Profile.fullname}</h1>
            <h1>username:{Profile.username}</h1>
            <h1>email:{Profile.email}</h1>
        </div> ) : null }
        {userStatus ? (<div>
            <h1>...Loading Profile</h1>
        </div>): <p className='text-center mt-10'>
            Please Login to configure your profile
        </p> }
    </div>
  )
}

export default Profile