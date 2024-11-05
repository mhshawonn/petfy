import React from 'react';

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-200"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;