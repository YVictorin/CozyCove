import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import completeLogo from "../assets/images/completeLogo.png"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const accountDropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
                setIsAccountDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [accountDropdownRef]);

    // Toggle dropdown on click
    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };

    return (
        <div className="w-full bg-transparent py-4 px-6 absolute top-0 left-0 right-0 z-50">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl flex items-center justify-between px-4 py-2 shadow-[7px_7px_0px_0px_rgba(0,0,0,0.2)]">

                {/* Logo with hover effect */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <div className="h-16 flex items-center transform transition-transform duration-300 hover:scale-110">
                            <img
                                src={completeLogo}
                                alt="logo"
                                className="h-25"
                            />
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-indigo-900 p-2 focus:outline-none"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" text="Home" />
                    <NavLink to="/Products" text="Products" />
                    <NavLink to="/Games" text="Games" />
                    <NavLink to="/Explore" text="Explore" />

                    {/* User Account Links */}
                    <div ref={accountDropdownRef} className="relative">
                        <button
                            onClick={toggleAccountDropdown}
                            className="flex items-center text-indigo-900 font-bold text-lg relative p-2 rounded-full group cursor-pointer"
                        >
                            <span className="relative z-10">Account</span>
                            <ChevronDown size={20} className="ml-1 relative z-10" />
                            <span className={`absolute inset-0 bg-purple-100 rounded-full transition-opacity ${isAccountDropdownOpen ? 'opacity-70' : 'opacity-0 group-hover:opacity-70'}`}></span>
                        </button>
                        {isAccountDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                <NavLink to="/register" text="Register" dropdownItem />
                                <NavLink to="/login" text="Login" dropdownItem />
                                <NavLink to="/account" text="My Account" dropdownItem />
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-24 left-0 right-0 px-6 z-40">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col space-y-3">
                        <MobileNavLink to="/" text="Home" onClick={toggleMenu} />
                        <MobileNavLink to="/Products" text="Products" onClick={toggleMenu} />
                        <MobileNavLink to="/Games" text="Games" onClick={toggleMenu} />
                        <MobileNavLink to="/Explore" text="Explore" onClick={toggleMenu} />

                        <div className="border-t border-gray-200 pt-2 mt-2">
                            <p className="text-sm text-gray-500 mb-2">Account</p>
                            <MobileNavLink to="/register" text="Register" onClick={toggleMenu} />
                            <MobileNavLink to="/login" text="Login" onClick={toggleMenu} />
                            <MobileNavLink to="/account" text="My Account" onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// navigation links with round hover effect
const NavLink = ({ to, text, dropdownItem = false }) => {
    if (dropdownItem) {
        return (
            <Link
                to={to}
                className="block px-4 py-2 text-indigo-900 hover:bg-purple-100 hover:text-purple-700"
            >
                {text}
            </Link>
        );
    }

    return (
        <Link
            to={to}
            className="relative px-3 py-2 text-indigo-900 font-bold text-lg group"
        >
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 bg-purple-100 rounded-full opacity-0 transition-opacity group-hover:opacity-100"></span>
        </Link>
    );
};

// Mobile navigation links
const MobileNavLink = ({ to, text, onClick }) => {
    return (
        <Link
            to={to}
            className="block py-2 px-4 text-indigo-900 font-bold text-lg hover:bg-purple-100 rounded-lg"
            onClick={onClick}
        >
            {text}
        </Link>
    );
};