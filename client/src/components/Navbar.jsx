import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import completeLogo from "../assets/images/completeLogo.png"


export default function Navbar() {
    return (
        <div className="w-full bg-transparent py-4 px-6 absolute top-0 left-0 right-0 z-50">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl flex items-center justify-between px-4 py-2 shadow-[7px_7px_0px_0px_rgba(0,0,0,0.2)]">

                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <div className="h-16 flex items-center">
                            <img
                                src={completeLogo}
                                alt="logo"
                                className="h-25"
                            />
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                    <NavLink to="/" text="Home" />
                    <NavLink to="/make" text="Make" />
                    <NavLink to="/play" text="Play" />
                    <NavLink to="/resources" text="Resources" />

                    {/* User Account Links */}
                    <div className="relative group">
                        <button
                            className="flex items-center text-indigo-900 font-bold text-lg relative p-2 rounded-full group"
                        >
                            <span className="relative z-10">Account</span>
                            <ChevronDown size={20} className="ml-1 relative z-10" />
                            <span className="absolute inset-0 bg-purple-100 rounded-full opacity-0 transition-opacity group-hover:opacity-70"></span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block">
                            <NavLink to="/register" text="Register" dropdownItem />
                            <NavLink to="/login" text="Login" dropdownItem />
                            <NavLink to="/account" text="My Account" dropdownItem />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

// Helper component for navigation links with round hover effect
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