import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [partnerId, setPartnerId] = useState('');
  const [error, setError] = useState(null);

  const getPeerId = async () => {
    try {
      const result = await axios.post('/auth/peerid', { username: partnerId });
      navigate('/call?partner=' + partnerId, {
        state: { task: 'makeCall', ...result.data }
      });
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error ?? `Unable to reach the partner.`);
    }
  };
  return (
    <div className="text-[#E9ECEF] bg-[#6C757D] font-Inter text-2xl flex justify-center items-center w-5/6 p-2 rounded-md shadow-md m-8 relative">
      {error && (
        <div className="absolute top-16 bg-red-600 font-semibold p-4 rounded-sm shadow-sm">
          {error}
        </div>
      )}
      <img src="/logo.png" />
      <div className="flex flex-col gap-2 ">
        <h2>Make a call...</h2>
        <input
          type="text"
          placeholder="Enter partner Id"
          className={
            error
              ? 'border-red-800 border-2 bg-red-200 text-red-700  focus:border-red-600 focus:ring-0'
              : 'text-stone-800'
          }
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />
        <button className="border p-1 bg-slate-800" onClick={getPeerId}>
          Call
        </button>
      </div>
    </div>
  );
};

export default HomePage;
