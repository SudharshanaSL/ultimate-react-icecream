import React from 'react';
import iceCreamImage from '../assets/img/ultimate-ice-cream.svg';

export const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImage} alt="" />
        Ultimate Ice Cream
      </h1>
    </header>
  );
};

export default Header;
