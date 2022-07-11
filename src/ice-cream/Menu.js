import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import PropTypes from 'prop-types';
import Main from '../structure/Main';
import FocusLink from '../structure/FocusLink';

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenu().then(menuData => {
      if (isMounted) {
        setMenu(menuData);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const onItemClickHandler = to => {
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
    <Main headingText="Rock your taste buds with one of these!">
      {isLoading ? (
        <LoaderMessage
          loadingMessage="Loading menu"
          doneMessage="Loading menu complete"
          isLoading={isLoading}
        />
      ) : menu.length ? (
        <ul className="container">
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <li key={id.toString()}>
                <section
                  className="card"
                  onClick={() => {
                    onItemClickHandler(`/menu-items/${id.toString()}`);
                  }}
                >
                  <div className="image-container">
                    <IceCreamImage iceCreamId={iceCream.id} />
                  </div>
                  <div className="text-container">
                    <h3>
                      <FocusLink
                        to={`/menu-items/${id.toString()}`}
                        onClick={onLinkClickHandler}
                      >
                        {iceCream.name}
                      </FocusLink>
                    </h3>
                    <div className="content card-content">
                      <p className="price">{`$${price.toFixed(2)}`}</p>
                      <p className={`stock${inStock ? '' : ' out'}`}>
                        {inStock ? `${quantity} in stock` : 'Out of stock'}
                      </p>
                      <p className="description">{description}</p>
                    </div>
                  </div>
                </section>
              </li>
            )
          )}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty! The sadness!</p>
      )}
    </Main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Menu;
