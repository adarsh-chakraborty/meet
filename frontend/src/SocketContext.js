import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  useEffect(() => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const myVideo = useRef();

    // Get permissions
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(stream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => {
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({
        from,
        name: callerName,
        callerName,
        signal,
        isReceivedCall: true
      });
    });
  }, []);

  const answerCall = () => {};

  const callUser = () => {};

  const leaveCall = () => {};
};
