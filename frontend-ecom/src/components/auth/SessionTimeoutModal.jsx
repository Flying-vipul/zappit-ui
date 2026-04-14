import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/actions';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SessionTimeoutModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSessionExpired } = useSelector((state) => state.auth);

    if (!isSessionExpired) return null;

    const handleLoginAgain = () => {
        dispatch({ type: "CLEAR_SESSION_EXPIRED" });
        dispatch(logOutUser(navigate));
    };

    return (
        <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm flex flex-col items-center text-center transform transition-all scale-100">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex justify-center items-center mb-5 shadow-inner">
                    <FaLock size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Session Expired</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                    For your security, your session has timed out or your access token is no longer valid. Please log in again to continue.
                </p>
                <button 
                    onClick={handleLoginAgain}
                    className="w-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-red-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                    Log In Again
                </button>
            </div>
        </div>
    );
};

export default SessionTimeoutModal;
