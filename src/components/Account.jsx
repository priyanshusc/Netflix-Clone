import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { useAuth } from '../hooks/AuthContext';
import { auth } from '../firebase';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const backgroundURL = "https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/71086d0b-2292-4352-8ca0-b2a43b2377a2/IN-en-20220829-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handlePasswordReset = async () => {
    if (user && user.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        setMessage('Password reset email sent! Please check your inbox.');
      } catch (error) {
        setMessage(error.message);
        console.error("Error sending password reset email:", error);
      }
    }
  };

  return (
    <div className="relative bg-black min-h-screen text-white">
      {/* Background and Overlay */}
      <img 
        src={backgroundURL} 
        alt="Background" 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20" 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-8 md:px-16 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 border-b border-gray-700 pb-4">Account</h1>

          {message && (
            <div className="bg-blue-500 text-white p-3 rounded-md mb-6 text-center">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-lg md:text-xl font-semibold text-gray-400 mb-4">MEMBERSHIP & BILLING</h2>
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg space-y-4">
                {/* The "Change account email" section has been removed */}
                <p className="">{user?.email}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-700 pt-4">
                  <p className="text-gray-400">Password: ********</p>
                  <button onClick={handlePasswordReset} className="text-blue-400 hover:underline text-sm mt-2 sm:mt-0">Change password</button>
                </div>
              </div>
            </div>
            
            {/* Right Section: User Profile (Unchanged) */}
            <div className="md:col-span-1">
              <h2 className="text-lg md:text-xl font-semibold text-gray-400 mb-4">MY PROFILE</h2>
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg flex items-center gap-4">
                <img
                  width="50"
                  className="rounded-md"
                  alt="Netflix default avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                />
                <div>
                  <p className="font-bold text-lg">{user?.displayName || 'User'}</p>
                  <p className="text-sm text-gray-400">All Maturities</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Plan Details Section (Unchanged) */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-gray-400 mb-4 border-t border-gray-700 pt-8">PLAN DETAILS</h2>
            <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="font-bold">Premium <span className="text-sm font-normal text-gray-300">Ultra HD</span></p>
              </div>
              <button className="text-blue-400 hover:underline text-sm mt-2 sm:mt-0">Change plan</button>
            </div>
          </div>

          {/* Sign Out Button (Unchanged) */}
          <div className="mt-10 text-center">
            <button
              onClick={handleSignOut}
              className="bg-red-600 font-bold py-2 sm:px-6 md:py-3 md:px-8 rounded-md hover:bg-red-700 transition w-full max-w-xs"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

