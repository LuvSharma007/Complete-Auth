import React from 'react'
import  {Routes , Route ,BrowserRouter } from "react-router-dom"
import {Login , Signup , Home} from "./pages/index"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App