import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ iceCreamId }) => {
  return (
    iceCreamId != null && (
      <img
        src={`${
          process.env.PUBLIC_URL
        }/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
        alt=""
      />
    )
  );
};

/**
 * If id is not set, an error will be thrown in console
 * If id is not passed as a number, but a string for example, a warning will be thrown 
 */
IceCreamImage.propTypes = {
  iceCreamId: PropTypes.number,
};

export default IceCreamImage;
