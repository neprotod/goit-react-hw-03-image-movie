import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <NavLink exact className="home-logo" to="/">
        Movies Finder
      </NavLink>
    </header>
  );
};

export default Header;
