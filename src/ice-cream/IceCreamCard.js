import React from 'react';
import IceCreamImage from './IceCreamImage';
import FocusLink from '../structure/FocusLink';
import PropTypes from 'prop-types';

const IceCreamCard = ({ iceCreamId, children, to, history, heading }) => {
  const onItemClickHandler = () => {
    /**
     * If the user clicks on Link (ice cream name),
     * Link component will push state to history
     * When the event bubbles up to the section tag,
     * history gets pushed again.
     *
     * We cannot remove the Link component
     * as screen readers and keyboard navigation users
     * require it to be present.
     *
     * Solution is to stop propagation in on clicking the Link component
     */
    history.push(to, {
      focus: true,
    });
  };

  const onLinkClickHandler = e => {
    e.stopPropagation();
  };

  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  children: PropTypes.node,
  to: PropTypes.oneOfType([
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
    PropTypes.string,
  ]),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  heading: PropTypes.string.isRequired,
};

export default IceCreamCard;
