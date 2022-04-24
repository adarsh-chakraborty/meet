import { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';

function App() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      console.log('My Peer ID is: ', id);
      setPeerId(id);
    });

    // Answering the call, set our video and remote video
    peer.on('call', (call) => {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true }, (mediaStream) => {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.play();

        call.answer(mediaStream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const callUser = (remotePeerId) => {
    // Setting our video and remote video when we sending a call.
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true }, (mediaStream) => {
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current.play();
      const call = peerInstance.current.call(remotePeerId, mediaStream);
      // accept the call

      call.on('stream', (remoteStream) => {
        // show stream in video element or canvas.
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

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

export default App;
