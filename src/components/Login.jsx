import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "firebase/auth";
import { FaPlus } from 'react-icons/fa';

// --- Reusable Feature Section Component ---
// This component builds one of the "Text & Image" sections.
// It takes props for the text, images, and direction to alternate the layout.
const FeatureSection = ({ title, subtitle, imgSrc, videoSrc, direction = 'left' }) => {
  return (
    <div className="border-t-8 border-gray-800 py-16 px-4 sm:px-8">
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 ${direction === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg sm:text-xl lg:text-2xl">{subtitle}</p>
        </div>
        <div className="md:w-1/2 relative">
          <img src={imgSrc} alt={title} className="relative z-10 w-full" />
          {videoSrc && (
            // This div positions the video perfectly inside the TV/device screen in the image
            <div className="absolute top-[20.5%] left-[13.5%] w-[73%] h-[54%]">
              <video src={videoSrc} autoPlay playsInline muted loop className="w-full h-full"></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Reusable FAQ Item Component ---
// This component is for a single question in the FAQ accordion.
// It manages its own open/closed state.
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-2 px-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#303030] py-4 md:py-5 px-6 md:px-8 text-left text-lg md:text-xl flex justify-between items-center hover:bg-[#404040] transition"
      >
        {question}
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <FaPlus size={20} />
        </span>
      </button>
      {isOpen && (
        <div className="bg-[#303030] p-6 mt-px text-lg md:text-xl">
          {answer}
        </div>
      )}
    </div>
  );
};

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    // Your existing sign-in and sign-up functions are preserved perfectly
    const handleSignIn = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user.emailVerified) {
          alert('Signed In Successfully!');
        } else {
          await signOut(auth);
          alert('Please verify your email before signing in.');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        alert('Account created! Please check your inbox to verify your email and then sign in.');
      } catch (error) {
        alert(error.message);
      }
    };

    const backgroundURL = "https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg";

    const faqData = [
      { q: "What is Netflix?", a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single ad – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!" },
      { q: "How much does Netflix cost?", a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." },
      { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles." },
      { q: "How do I cancel?", a: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime." },
    ];

    return (
      <div className="bg-black text-white">
        {/* --- Hero / Login Section --- */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[800px] sm:h-screen bg-black/60"></div>
          <img className="w-full h-[800px] sm:h-screen object-cover" src={backgroundURL} alt="Netflix Background" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="max-w-md w-full mx-10">
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="bg-black/70 p-8 sm:p-16 rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-white">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </h1>
                <div className="flex flex-col gap-4">
                  {isSignUp && (
                    <input
                      className="p-3 rounded bg-gray-700 text-white"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  <input
                    className="p-3 rounded bg-gray-700 text-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="p-3 rounded bg-gray-700 text-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="bg-red-600 py-3 mt-4 rounded font-bold text-white hover:bg-red-700 transition">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                  <p className="text-gray-500 mt-8">
                    {isSignUp ? 'Already have an account?' : 'New to Netflix?'}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-white ml-2 hover:underline">
                      {isSignUp ? 'Sign In' : 'Sign up now.'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --- Feature Sections --- */}
        <FeatureSection
          title="Enjoy on your TV"
          subtitle="Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          imgSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
          // TODO: Replace with your video file path
          videoSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
        />
        <FeatureSection
          title="Download your shows to watch offline"
          subtitle="Save your favorites easily and always have something to watch."
          // TODO: Replace with your image file path
          imgSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          direction="right"
        />
        <FeatureSection
          title="Watch everywhere"
          subtitle="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
          // TODO: Replace with your image file path
          imgSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
          // TODO: Replace with your video file path
          videoSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v"
        />
        
        {/* --- FAQ Section --- */}
        <div className="border-t-8 border-gray-800 py-16 px-4 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            {faqData.map(item => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* --- Footer Section --- */}
        <div className="border-t-8 border-gray-800 py-8">
            <p className="text-center text-gray-500">Made By Priyanshu</p>
        </div>
      </div>
    );
};
