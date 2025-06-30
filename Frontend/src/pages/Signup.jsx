import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState(
    { 
        fullname: '',
        username:'' ,
        email: '',
        password: ''
    }
);

    const [error,setError] = useState('')



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const userCreated = await axios.post("/api/v1/users/register", form);
        if(userCreated){
            alert("registered successfully!");
        }
    } catch (error) {
        if(error.response && error.response.data?.message){
            setError(error.response.data.message);
        }else{
            setError('Something went wrong , please try again')
        }
        console.log("Error signup user",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Signup</h1>
        {error && <p className="text-red-500 bg-red-100 p-2 text-center rounded">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <label className="flex flex-col">
            <span className="mb-1">Full Name:</span>
            <input
              type="text"
              name="fullname"
              className="border p-2 rounded"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Username:</span>
            <input
              type="text"
              name="username"
              className="border p-2 rounded"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Email:</span>
            <input
              type="email"
              name="email"
              className="border p-2 rounded"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Password:</span>
            <input
              type="password"
              name="password"
              className="border p-2 rounded"
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;