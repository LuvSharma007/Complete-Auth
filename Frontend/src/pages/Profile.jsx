import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../store/profileSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [localProfile, setLocalProfile] = useState(null);
  const profile = useSelector(state => state.profile.profileData);


  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await axios.get("/api/v1/userProfile/get-profile", {
          withCredentials: true
        })
        if (userProfile?.data.data) {
          dispatch(setProfile(userProfile.data.data))
          setLocalProfile(userProfile.data.data)
          // console.log(userProfile.data.data);
        }
      } catch (error) {
        console.log('Error getting user Profile', error);
      }
    }
    if (!profile) {
      getUserProfile();
    } else {
      setLocalProfile(profile);
    }
  }, [dispatch, profile])

  // console.log(profile);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {!localProfile && !profile ? ( <div>
        <h1 className='text-center'>Please Configure your Profile !</h1>
      </div> ): null }
      {localProfile  ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border-2">
          <img src={localProfile.coverImage?.url} alt="Cover" className="w-full h-40 object-cover" />

          <div className="flex items-center space-x-4 p-4">
            <img
              src={localProfile.profileImage?.url}
              alt="localProfile"
              className="w-24 h-24 rounded-full border-4 border-white -mt-16"
            />
            <div>
              <h2 className="text-gray-800 text-2xl font-semibold">{localProfile.name}</h2>
              <p className="text-gray-600">{localProfile.bio}</p>
              <p className="text-sm text-gray-500">{localProfile.location}</p>
              <a
                href={localProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {localProfile.website}
              </a>
            </div>
          </div>
        </div>
      ) : null }
      <button
      onClick={()=>{navigate("/edit-profile")}}
      className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition mt-10'
      >Edit Profile</button>
    </div>

  )
}

export default Profile