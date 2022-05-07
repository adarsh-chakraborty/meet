import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [partnerId, setPartnerId] = useState('');
  return (
    <div className="text-[#E9ECEF] bg-[#6C757D] font-Inter text-2xl flex justify-center items-center w-5/6 p-2 rounded-md shadow-md m-8">
      <img src="/logo.png" />
      <div className="flex flex-col gap-2 ">
        <h2>Make a call...</h2>
        <input
          type="text"
          placeholder="Enter partner Id"
          className="text-stone-800"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />
        <button
          className="border p-1 bg-slate-800"
          onClick={() => navigate(`/call?partner=${partnerId}`)}
        >
          Call
        </button>
      </div>
    </div>
  );
};

export default HomePage;
