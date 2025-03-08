import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-10 bg-transparent border-b border-black/5 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between py-4 px-4 lg:px-0">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="mr-8 font-bold text-xl tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex-grow md:flex-grow-0"
          >
            SITE EVALUATOR
          </Link>

          {/* Navigation Links */}
          <div className="flex-1 flex justify-center mx-2">
            <Link 
              to="/" 
              className={`mx-1.5 relative px-3 py-2 ${
                isActive('/') 
                  ? 'text-blue-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-[20%] after:w-[60%] after:h-[3px] after:rounded-md after:bg-blue-600' 
                  : 'text-gray-600 font-medium'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/evaluate" 
              className={`mx-1.5 relative px-3 py-2 ${
                isActive('/evaluate') 
                  ? 'text-blue-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-[20%] after:w-[60%] after:h-[3px] after:rounded-md after:bg-blue-600' 
                  : 'text-gray-600 font-medium'
              }`}
            >
              About
            </Link>
            <Link 
              to="/history" 
              className={`mx-1.5 relative px-3 py-2 ${
                isActive('/history') 
                  ? 'text-blue-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-[20%] after:w-[60%] after:h-[3px] after:rounded-md after:bg-blue-600' 
                  : 'text-gray-600 font-medium'
              }`}
            >
              Documentation
            </Link>
            <Link 
              to="/about" 
              className={`mx-1.5 relative px-3 py-2 ${
                isActive('/about') 
                  ? 'text-blue-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-[20%] after:w-[60%] after:h-[3px] after:rounded-md after:bg-blue-600' 
                  : 'text-gray-600 font-medium'
              }`}
            >
              Pricing
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <button 
              className="mr-2 px-6 py-1.5 rounded-lg font-semibold bg-gradient-to-r from-[#4568dc] to-[#b06ab3] bg-clip-text text-transparent relative hover:bg-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 before:content-[''] before:absolute before:inset-0 before:p-[1.5px] before:rounded-lg border border-blue-500 before:from-[#4568dc] before:to-[#b06ab3] before:mask-composite-exclude"
            >
              Login
            </button>
            <button 
              className="px-6 py-2 rounded-lg font-medium text-white shadow-lg shadow-blue-500/40 bg-gradient-to-r from-[#4568dc] to-[#b06ab3] hover:from-[#3f5bd5] hover:to-[#a55aa8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
