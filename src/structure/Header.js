import React from 'react';
import iceCream from '../assets/img/ultimate-ice-cream.svg';
/**
 * Use NavLink component when we have to make routing accessible.
 * Note that routes should already be registered.
 * It sets aria-current attribute to page when we are on the target page
 * Also we can indicate it to set an active class using prop activeClassName
 */
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <img src={iceCream} alt="" />
      Ultimate Ice Cream
    </h1>
    <nav aria-label="Main navigation">
      <NavLink to="/" activeClassName="active" exact>
        Menu
      </NavLink>
    </nav>
  </header>
);

export default Header;
