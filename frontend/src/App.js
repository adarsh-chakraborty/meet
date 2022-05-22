import Pages from './Pages/Pages';
import AppContext from './context/appContext';
import { useContext } from 'react';
import Modal from './Components/Modal';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const { isReceivingCall, setReceivingCall } = useContext(AppContext);

  const acceptCall = () => {
    setReceivingCall(false);
    navigate('/call', { state: { task: 'acceptCall' } });
  };
  const rejectCall = () => {
    setReceivingCall(false);
    console.log('Call Rejected!!!');
  };

  return (
    <div className="min-h-screen bg-[#343A40] flex justify-center">
      {isReceivingCall && (
        <Modal>
          <h1 className="text-center py-2 font-Inter text-2xl mb-2">
            You are receiving a call from Adarsh!
          </h1>
          <div className="flex gap-2 w-full justify-around">
            <button
              className="border-2 border-emerald-900 text-xl font-Inter font-bold rounded-md px-2 py-1 text-emerald-900 bg-emerald-400 shadow-md hover:bg-emerald-600-400 hover:scale-105 transition-all duration-100 ease-in-out"
              onClick={acceptCall}
            >
              Answer
            </button>
            <button
              className="border-2 border-red-900 text-xl font-Inter font-bold rounded-md px-2 py-1 text-red-900 bg-red-400 shadow-md hover:bg-emerald-600-400 hover:scale-105 transition-all duration-100 ease-in-out"
              onClick={rejectCall}
            >
              Hangup
            </button>
          </div>
        </Modal>
      )}
      <Pages />
    </div>
  );
}

export default App;
