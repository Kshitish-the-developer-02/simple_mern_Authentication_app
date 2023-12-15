import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [user, setusers] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposne = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const token = resposne.data.token;
      alert("log in successful");
      setUserName("");
      setPassword("");
      navigate("/account");
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (error) {
        console.log('Login error');
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className=" w-[50%] bg-gray-600 text-white flex justify-center items-center rounded-2xl">
        <form
          className=" text-center border rounded-lg w-[600px] h-[400px] p-9 mb-5 mt-5"
          onSubmit={handleLogin}
        >
          {/* username  input section*/}
          <label>Username</label> <br />
          <input
            type="text"
            placeholder=" enter your email "
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
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
            Log In
          </button>
        </form>
      </div>
      <div className=" bg-green-300 w-[50%] h-[100vh] flex justify-center items-center rounded-2xl ">
        <h2 className="  text-black font-bold text-5xl">LogIn</h2>
      </div>
    </div>
  );
}

export default Login;
