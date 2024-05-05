import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const Header = () => {
  return (
    <div className="bg-gray-900 text-white p-5">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo or Branding can go here */}
          <Link to={ROUTES.HOME} className="text-xl font-bold hover:text-red-600">Sebas' Movies</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to={ROUTES.POPULAR} className="font-semibold hover:text-red-600 transition duration-300">Popular</Link>
          </li>
          <li>
            <Link to={ROUTES.TOPRATED} className="font-semibold hover:text-red-600 transition duration-300">Top Rated</Link>
          </li>
          <li>
            <Link to={ROUTES.NOWPLAYING} className="font-semibold hover:text-red-600 transition duration-300">Now Playing</Link>
          </li>
          <li>
            <Link to={ROUTES.MYFAVORITES} className="font-semibold hover:text-red-600 transition duration-300">My Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
