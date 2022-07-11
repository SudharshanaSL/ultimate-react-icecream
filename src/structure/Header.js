import React from 'react';
import iceCream from '../assets/img/ultimate-ice-cream.svg';
import FocusLink from './FocusLink';

const Header = () => (
  <header>
    <h1>
      <img src={iceCream} alt="" />
      Ultimate Ice Cream
    </h1>
    <nav aria-label="Main navigation">
      <FocusLink
        to={{ pathname: '/', state: { focus: true } }}
        activeClassName="active"
        exact
      >
        Menu
      </FocusLink>
    </nav>
  </header>
);

export default Header;
