import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed w-full top-0 z-10 bg-transparent border-b border-black/5 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between py-4 px-4 lg:px-0">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="mr-8 font-bold text-xl tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex-grow md:flex-grow-0"
          >
            SITE EVALUATOR
          </Link>

          {/* Hamburger Menu Button (mobile only) */}
          <button 
            className="block md:hidden ml-auto mr-4 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center mx-2">
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

          {/* Right side buttons (desktop) */}
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <button 
                className="mr-2 px-6 py-1.5 rounded-lg font-semibold bg-gradient-to-r from-[#4568dc] to-[#b06ab3] bg-clip-text text-transparent relative hover:bg-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 before:content-[''] before:absolute before:inset-0 before:p-[1.5px] before:rounded-lg border border-blue-500 before:from-[#4568dc] before:to-[#b06ab3] before:mask-composite-exclude"
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
            <button 
              className="px-6 py-2 rounded-lg font-medium text-white shadow-lg shadow-blue-500/40 bg-gradient-to-r from-[#4568dc] to-[#b06ab3] hover:from-[#3f5bd5] hover:to-[#a55aa8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              Sign Up
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        style={{ backgroundColor: 'white' }} 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-[300px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-end p-4 bg-white border-b">
          <button 
            className="focus:outline-none" 
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col bg-white" style={{ padding: '16px' }}>
          <Link 
            to="/" 
            className={`block my-2 py-3 px-4 ${isActive('/') ? 'text-blue-600 font-bold bg-blue-50 rounded-lg' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-current">Home</span>
          </Link>
          <Link 
            to="/evaluate" 
            className={`block my-2 py-3 px-4 ${isActive('/evaluate') ? 'text-blue-600 font-bold bg-blue-50 rounded-lg' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-current">About</span>
          </Link>
          <Link 
            to="/history" 
            className={`block my-2 py-3 px-4 ${isActive('/history') ? 'text-blue-600 font-bold bg-blue-50 rounded-lg' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-current">Documentation</span>
          </Link>
          <Link 
            to="/about" 
            className={`block my-2 py-3 px-4 ${isActive('/about') ? 'text-blue-600 font-bold bg-blue-50 rounded-lg' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-current">Pricing</span>
          </Link>
          <div className="mt-6 px-4">
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full">
              <button className="w-full mb-3 px-6 py-2.5 rounded-lg font-semibold text-blue-600 border border-blue-500">
                Login
              </button>
            </Link>
            <button className="w-full px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
