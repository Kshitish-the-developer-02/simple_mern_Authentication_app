import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function SignUp() {
    const[user,setUsers]=useState([])
    const[username,setUserName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        fetchUsers()
    },[])
    
    const fetchUsers=()=>{
        axios.get('http://localhost:3001/register')
        .then((res)=>{
            console.log(res.data);
        })
    }
    
    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{username,email,password})
        .then(()=>{
            alert('registration Successful')
            setUserName('')
            setEmail('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })
        .catch((err)=>{
            console.log('unable to register');
        })
    }

  return (
    <div className="w-full h-full flex">
      <div className=" w-[50%] bg-gray-600 text-white flex justify-center items-center rounded-2xl">
        <form className=" text-center border rounded-lg w-[600px] h-[400px] p-9 mb-5 mt-5"
         onSubmit={handleRegister}>
          {/* email input section */}
          <label className=" my-1">Username</label> <br />
          <input
            type="text"
            placeholder=" enter your username "
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            className=" w-[400px] h-[40px] rounded-xl
                         bg-blue-100 p-3  text-black font-semibold"
          />
          <br />
          <br />

          {/* username  input section*/}
          <label>Email</label> <br />
          <input
            type="email"
            placeholder=" enter your email "
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className=" w-[400px] h-[40px] rounded-xl
                         bg-blue-100 p-3 text-black font-semibold"
          />
          <br />
          <br />

          {/* password  input section*/}
          <label>Password</label> <br />
          <input
            type="password"
            placeholder=" enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className=" w-[400px] h-[40px] rounded-xl
                         bg-blue-100 p-3  text-black font-semibold"
          />
          <br />
          <br />
          {/* Button */}
          <button className=" w-[150px] h-[50px] border rounded-md bg-blue-600 hover:bg-teal-700">
            Sign Up
          </button>
        </form>
      </div>
         <div className=" bg-green-300 w-[50%] h-[100vh] flex justify-center items-center rounded-2xl ">
            <h2 className="  text-black font-bold text-5xl">
                SignUp
            </h2>
         </div>
    </div>
  );
}

export default SignUp;
