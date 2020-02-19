import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header>
      <NavLink exact activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="active" to="/movies">
        Movies
      </NavLink>
      <Link className="home-logo" to="/">
        Movies Finder
      </Link>
    </header>
  );
};

export default Header;
