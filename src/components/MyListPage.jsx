// src/pages/MyListPage.jsx
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MovieCard } from '../components/MovieCard';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/AuthContext';
import { Link } from 'react-router-dom';
import { useTrailer } from '../hooks/TrailerContext'; // 1. Import useTrailer

// A subtle background image for the page
const backgroundURL = "https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const MyListPage = () => {
    const { user } = useAuth();
    const [myList, setMyList] = useState([]);
    const { openTrailer } = useTrailer(); // 2. Get the openTrailer function
    const [tappedCardId, setTappedCardId] = useState(null); // 3. Add state for mobile tap

    useEffect(() => {
        const fetchMyList = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists() && docSnap.data().myList) {
                    setMyList(docSnap.data().myList);
                } else {
                    console.log("No such document or empty list!");
                }
            }
        };

        fetchMyList();
    }, [user]);

    // 4. Handler for card tap logic
    const handleCardTap = (movieId) => {
        setTappedCardId(prevId => (prevId === movieId ? null : movieId));
    };

    return (
        <div className="relative bg-black min-h-screen">
            {/* Background Image and Overlay */}
            <img
                src={backgroundURL}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

            {/* Page Content */}
            <div className="relative z-10">
                <Navbar />
                <div className="pt-24 p-8">
                    {myList.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {myList.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onClick={openTrailer} // 5. Pass trailer function
                                    isTapped={movie.id === tappedCardId} // 6. Pass tapped state
                                    onCardTap={() => handleCardTap(movie.id)} // 7. Pass tap handler
                                />
                            ))}
                        </div>
                    ) : (
                        // Centering container for the empty list message
                        <div className="h-[60vh] flex flex-col justify-center pt-15 items-center">
                            <h1 className="text-white text-8xl text-center font-extrabold font-montserrat">Nothing to show</h1>

                            <Link to="/" className="bg-red-600 text-white font-bold py-3 px-6 rounded-md mt-12 hover:bg-red-700 transition">
                                Browse to Add
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};