import { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppContext from '../context/appContext';

function Call() {
  const location = useLocation();
  const navigate = useNavigate();
  const { peer, call } = useContext(AppContext);
  const queryParams = new URLSearchParams(location.search);
  const partnerId = queryParams.get('partner');

  const [error, setError] = useState(null);
  const [isCallAccepted, setIsCallAccepted] = useState(false);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  console.log(location.state);

  const answerCall = useCallback(() => {
    console.log('Answering call');
    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current.play();

      call.answer(mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  }, [call]);

  const callUser = useCallback(
    (remoteID) => {
      // Setting our video and remote video when we sending a call.
      console.log('Calling ', remoteID);
      let now = Date.now();

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          localVideoRef.current.srcObject = mediaStream;
          localVideoRef.current.play();

          // Sending call request
          const call = peer.call(remoteID, mediaStream);

          // On Receiving a call, show it on screen.
          // Will only invoke if accepted.
          call.on('stream', (remoteStream) => {
            setIsCallAccepted(true);
            // show stream in video element or canvas.
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch(function (err) {
          console.log(err);
          setError(true);
          console.log('GUM failed with error, time diff: ', Date.now() - now);
        });
    },
    [peer]
  );

  useEffect(() => {
    console.log('USE EFFECT RAN');
    if (!location.state) return navigate('/', { replace: true });
    if (location.state.task === 'makeCall') {
      const remoteIdPeer = location.state.peerId;
      callUser(remoteIdPeer);
    }
    if (location.state.task === 'acceptCall') {
      answerCall();
    }
  }, [location.state, callUser, answerCall, navigate]);

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
      <div>
        <video ref={localVideoRef} />
      </div>
      <div>
        {location.state.task === 'makeCall' && !isCallAccepted && (
          <div className="font-Inter text-xl font-semibold">
            Please wait till {partnerId} accepts your call...
          </div>
        )}
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default Call;
