import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>Oops! Page not found 😕</h2>
      <p>The page you’re looking for doesn't exist or has been moved.</p>
      <Link to="/" className="back-home">Go back to Homepage</Link>
    </div>
  );
};

export default NotFound;
