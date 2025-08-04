import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-serenity">
      <h1>404</h1>
      <h2>Oops! Page not found 😕</h2>
      <p>The page you’re looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">Go back to Homepage</Link>
    </div>
  );
};

export default NotFound;
