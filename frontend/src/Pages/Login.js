import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      if (res.status === 202) {
        navigate('/');
      }
    } catch (err) {
      console.log(err.data);
    }
  };
  return (
    <div className="bg-[#ADB5BD] w-1/2 flex flex-col mt-4 rounded-lg shadow-md ">
      <h2 className="font-Inter text-3xl font-bold text-center mt-24">Login</h2>
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center">
        <div className="flex items-center ">
          <img src="/logo.png" width="240px" />
        </div>
        <div className="mt-8">
          <form className="flex flex-col gap-2" onSubmit={loginUser}>
            <label className="relative text-gray-400 focus-within:text-gray-600 block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
              />
            </label>
            <label className="relative text-gray-400 focus-within:text-gray-600 block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
              />
            </label>
            <button className="bg-[#343A40] shadow-md rounded-sm p-2 text-[#E9ECEF] hover:bg-[#212529] transition-colors duration-200">
              Login
            </button>
            <Link to={'/reset'} className="text-stone-800 text-right pr-2 pt-2">
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
