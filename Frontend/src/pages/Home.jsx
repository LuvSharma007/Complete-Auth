import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { logout,login } from '../store/authSlice';
import axios from "axios"

const Home = () => {

  const authStatus = useSelector(state=>state.auth.status);
  const dispatch = useDispatch();

   useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const loginUser = await axios.get('/api/v1/users/current-user');
        if(loginUser.data && !authStatus){
          dispatch(login(loginUser.data.data))
          console.log("Login user found",loginUser.data.data);          
        }
      } catch (error) {
        if(authStatus){
          dispatch(logout());
          console.log("User not found !");          
        }
      }
    };

    getCurrentUser();
  }, [authStatus, dispatch]);


  return (

    <div>
    <p className='text-center text-4xl text-shadow-cyan-400 mt-10'>
      Learn How Authentication and Authorization works in a websites
    </p>
    </div>
  )
}

export default Home