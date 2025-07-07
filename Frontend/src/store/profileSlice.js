import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    profileData:null
};

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        setProfile:(state,action)=>{
            state.status = true;
            state.profileData = action.payload
        },
        clearProfile:(state,action)=>{
            state.status = false;
            state.profileData = null;
        }
    }

})

export const {setProfile , clearProfile} = profileSlice.actions

export default profileSlice.reducer;
