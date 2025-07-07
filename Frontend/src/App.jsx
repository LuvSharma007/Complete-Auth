import React from 'react'
import './index.css'
import  {Routes , Route ,BrowserRouter } from "react-router-dom"
import {Login , Signup , Home,Profile, EditProfile} from "./pages/index"
import Layout from './components/Layout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App