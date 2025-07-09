import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { clearProfile, setProfile } from '../store/profileSlice'
import { Navigate } from 'react-router-dom'

const EditProfile = () => {

  const {register , handleSubmit,reset } = useForm()
  const dispatch = useDispatch();
  const userProfile = useSelector(state=>state.profile.profileData);

  useEffect(()=>{
    if(userProfile){
      reset({
        name:userProfile.name || '',
        bio:userProfile.bio || '',
        location:userProfile.location || '',
        website:userProfile.website || ''
      })
    }
  },[userProfile , reset])
  

  const onSubmit = async (data)=>{
    try {
      if(!userProfile){
      const formData = new FormData()
      formData.append('name',data.name)
      formData.append('bio',data.bio)
      formData.append('location',data.location)
      formData.append('website',data.website)
      formData.append('profileImage',data.profileImage[0])
      formData.append('coverImage',data.coverImage[0])
      
      const response = await axios.post("/api/v1/userProfile/configure-profile",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      })
      dispatch(setProfile(response.data.data))

      // console.log('configured profile',response.data);
      alert("Profile configured Successfully")
      Navigate("/profile")
      }else{
      dispatch(clearProfile());
      const formData = new FormData()
      formData.append('name',data.name)
      formData.append('bio',data.bio)
      formData.append('location',data.location)
      formData.append('website',data.website)

      if(data.profileImage && data.profileImage.length > 0){
        formData.append('profileImage',data.profileImage[0])
      }

      if(data.coverImage && data.coverImage.length>0){
        formData.append('coverImage',data.coverImage[0])
      }

      const response = await axios.post("/api/v1/userProfile/update-profile",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      })

      dispatch(setProfile(response.data.data))
      

      // console.log('configured profile',response.data);
      alert("Profile updated Successfully")
      }
      Navigate("/profile");
      
    } catch (error) {
      console.error('error submitting form:',error.response?.data || error.message);
    }
  }

  return (
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text"
            {...register('name')}
            className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            {...register('bio')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
          type='text'
            {...register('location')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Website</label>
          <input 
          type='text'
            {...register('website')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Image</label>
          <input 
          type='file'
          accept='image/*'
            {...register('profileImage')}
            className="block"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input 
          type='file'
          accept='image/*'
            {...register('coverImage')}
            className="block"
          />
        </div>
        <button type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Save
        </button>
        </form>
      </div>
  )
}

export default EditProfile