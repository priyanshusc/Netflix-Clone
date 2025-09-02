import React, { useState, useEffect, useRef } from 'react'; // 1. Import useRef
import { NavLink, Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaSearch, FaBell } from 'react-icons/fa';
import { SearchOverlay } from './SearchOverlay';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const [isBrowseOpen, setIsBrowseOpen] = useState(false);
    const browseRef = useRef(null);

    const location = useLocation();

    // Effect for the scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. New Effect: Close dropdown if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            // Add this check for the new "Browse" dropdown
            if (browseRef.current && !browseRef.current.contains(event.target)) {
                setIsBrowseOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPageName = () => {
        switch (location.pathname) {
            case '/': return 'Home';
            case '/tv': return 'TV Shows';
            case '/movies': return 'Movies';
            case '/mylist': return 'My List';
            default: return 'Browse';
        }
    };

    const getNavLinkClass = ({ isActive }) => {
        return `p-2 hover:bg-gray-700 rounded ${isActive ? 'font-bold bg-gray-700 text-white' : 'text-gray-300'}`;
    };

    const getDesktopNavLinkClass = ({ isActive }) => {
        return `hover:text-gray-400 transition-colors ${isActive ? 'font-bold text-white' : 'text-gray-300'}`;
    };


    const notifications = [
        { id: 1, text: "New Arrival: Stranger Things Season 5 is now available!" },
        { id: 2, text: "See what's in the Top 10 in India today." },
        { id: 3, text: "Because you watched Mission: Impossible, we think you'll like Jack Reacher." },
    ];

    // Function to sign the user out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Function to determine the style of the active navigation link
    // const navLinkStyles = ({ isActive }) => {
    //     return {
    //         fontWeight: isActive ? 'bold' : 'normal',
    //         color: isActive ? 'white' : '#E5E5E5',
    //     };
    // };

    return (
        <>
            <div
                className={`fixed top-0 left-0 w-full px-5 py-6 z-40 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black'}`}
            >
                <div className="flex items-center gap-4 md:gap-8">
                    <Link to="/">
                        <img
                            width="140"
                            alt="Netflix Logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png?20190206123158"
                            class="w-[120px] sm:w-[140px]"
                        />
                    </Link>

                    {/* Browse Dropdown for Mobile */}
                    <div className="relative md:hidden pr-10" ref={browseRef}>
                        <button
                            onClick={() => setIsBrowseOpen(!isBrowseOpen)}
                            className="text-white font-semibold flex items-center gap-1 hover:text-gray-300 transition-colors"
                        >
                            {getPageName()} <span className={`text-xs transition-transform duration-200 ${isBrowseOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {/* The width of this dropdown is now responsive */}
                        <div
                            className={`absolute top-full left-0 mt-2 w-56 bg-black bg-opacity-90 rounded-md shadow-lg transition-all duration-300 ease-in-out ${isBrowseOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                        >
                            <nav className="flex flex-col p-2">
                                <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                                <NavLink to="/tv" className={getNavLinkClass}>TV Shows</NavLink>
                                <NavLink to="/movies" className={getNavLinkClass}>Movies</NavLink>
                                <NavLink to="/mylist" className={getNavLinkClass}>My List</NavLink>
                            </nav>
                        </div>
                    </div>

                    {/* Standard Navigation for Desktop */}
                    <nav className="text-gray-300 hidden md:flex gap-6">
                        <NavLink to="/" className={getDesktopNavLinkClass}>Home</NavLink>
                        <NavLink to="/tv" className={getDesktopNavLinkClass}>TV Shows</NavLink>
                        <NavLink to="/movies" className={getDesktopNavLinkClass}>Movies</NavLink>
                        <NavLink to="/mylist" className={getDesktopNavLinkClass}>My List</NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-4 md:gap-6 text-white pr-2">
                    <FaSearch onClick={() => setIsSearchOpen(true)} className="cursor-pointer hover:text-gray-400" size={20} />

                    <div className="relative" ref={notifRef}>
                        <FaBell
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                            className="cursor-pointer hover:text-gray-400 transition-colors"
                            size={20}
                        />
                        {/* The width of this dropdown is now responsive */}
                        <div
                            className={`absolute top-full right-0 mt-2 w-60 sm:w-80 bg-black bg-opacity-90 rounded-md shadow-lg transition-all duration-200 ease-in-out ${isNotifOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                        >
                            <ul className="text-white text-[13px] sm:text-sm">
                                {notifications.map(notif => (
                                    <li key={notif.id} className="p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 cursor-pointer">
                                        {notif.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
                            <img
                                width="30"
                                className="cursor-pointer rounded-sm"
                                alt="Netflix default avatar"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                            />
                        </button>
                        {/* The width of this dropdown is now responsive */}
                        <div
                            className={`absolute top-full right-0 mt-2 w-32 xsm:w-36 sm:w-40 md:w-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 transition-all duration-300 ease-in-out transform
    ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`
                            }
                        >
                            <ul className="text-white text-sm font-medium divide-y divide-gray-700">
                                <li className="px-4 py-3 hover:bg-gray-700 hover:text-gray-200 cursor-pointer transition-colors duration-200">
                                    <Link to="/account" onClick={() => setIsDropdownOpen(false)}>Account</Link>
                                </li>
                                <li
                                    onClick={handleSignOut}
                                    className="px-4 py-3 hover:bg-gray-700 hover:text-rose-400 cursor-pointer transition-colors duration-200"
                                >
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};