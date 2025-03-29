import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} Mess Management. All rights reserved.</p>
        <div className="flex justify-center space-x-8 mt-4">
          <Link to="/privacy-policy" className="hover:text-blue-400 text-sm">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-blue-400 text-sm">Terms of Service</Link>
          <Link to="/contact-us" className="hover:text-blue-400 text-sm">Contact Us</Link>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


