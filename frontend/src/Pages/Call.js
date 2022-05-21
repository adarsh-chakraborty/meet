import { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import Pages from './Pages';

function Call() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const partnerId = queryParams.get('partner');
  console.log(partnerId);

  const [error, setError] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState(partnerId);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {}, []);

  const callUser = (remotePeerId) => {
    // Setting our video and remote video when we sending a call.
    let now = Date.now();
    navigator.mediaDevices
      .getUserMedia({ video: true }, (mediaStream) => {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        // accept the call

        call.on('stream', (remoteStream) => {
          // show stream in video element or canvas.
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      })
      .catch(function (err) {
        setError(true);
        console.log('GUM failed with error, time diff: ', Date.now() - now);
      });
  };

  if (error) {
    return (
      <div className="flex gap-2 h-min text-2xl text-red-500 bg-red-100 font-extrabold font-Inter mt-14 px-4 py-8 rounded-md shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        You need to give media permissions to make a call.
      </div>
    );
  }

  return (
    <div>
      <h2>{peerId}</h2>
      <input
        type="text"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      />
      <button onClick={() => callUser(remotePeerId)}>Call</button>
      <div>
        <video ref={localVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default Call;
