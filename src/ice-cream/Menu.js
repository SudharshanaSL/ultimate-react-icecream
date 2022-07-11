import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import { Helmet } from 'react-helmet';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    history.push(to);
  };

  const onLinkClickHandler = e => {
    e.stopPropagation();
  };

  return (
    <main>
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
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
                    onItemClickHandler(`/menu-items/:${id.toString()}`);
                  }}
                >
                  <div className="image-container">
                    <IceCreamImage iceCreamId={iceCream.id} />
                  </div>
                  <div className="text-container">
                    <h3>
                      <Link
                        to={`/menu-items/:${id.toString()}`}
                        onClick={onLinkClickHandler}
                      >
                        {iceCream.name}
                      </Link>
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
    </main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Menu;
