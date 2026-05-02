import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        
    
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4">
          404
        </h1>

     
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

    
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

     
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;