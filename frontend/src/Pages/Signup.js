import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    const result = await axios.post('/auth/register', {
      username,
      password,
      email
    });
    if (result.status === 201) {
      setMessage('Your account is created, you can login now!');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div className="bg-[#ADB5BD] w-1/2 flex flex-col mt-4 rounded-lg shadow-md ">
      <h2 className="font-Inter text-3xl font-bold text-center mt-24">
        {message && (
          <div className="bg-emerald-300 h-1/2 mx-8 my-2 flex flex-col mt-4 rounded-lg shadow-md ">
            <div className="flex text-emerald-800 font-Inter font-semibold text-2xl p-4 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{message}</span>
            </div>
          </div>
        )}
        Create an account
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center">
        <div className="flex items-center ">
          <img src="/logo.png" width="240px" />
        </div>
        <div className="mt-8">
          <form className="flex flex-col gap-2" onSubmit={registerUser}>
            <label class="relative text-gray-400 focus-within:text-gray-600 block">
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
                placeholder="Choose an Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                class="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
              />
            </label>
            <label class="relative text-gray-400 focus-within:text-gray-600 block">
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
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
              />
            </label>
            <label class="relative text-gray-400 focus-within:text-gray-600 block">
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
                placeholder="A Strong Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
              />
            </label>
            <button className="bg-[#343A40] shadow-md rounded-sm p-2 text-[#E9ECEF] hover:bg-[#212529] transition-colors duration-200 font-Inter">
              Create account
            </button>
            <span className="text-stone-800 text-right text-xs pr-2 pt-2 font-Inter">
              Already have an account? Login now!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
