import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import PropTypes from 'prop-types';
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';

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

  return (
    <Main headingText="Rock your taste buds with one of these!">
      {isLoading ? (
        <LoaderMessage
          loadingMessage="Loading menu"
          doneMessage="Loading menu complete"
          isLoading={isLoading}
        />
      ) : menu.length ? (
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <IceCreamCard
                iceCreamId={iceCream.id}
                to={`/menu-items/${id.toString()}`}
                heading={iceCream.name}
                history={history}
                key={id.toString()}
              >
                <div className="content card-content">
                  <p className="price">{`$${price.toFixed(2)}`}</p>
                  <p className={`stock${inStock ? '' : ' out'}`}>
                    {inStock ? `${quantity} in stock` : 'Out of stock'}
                  </p>
                  <p className="description">{description}</p>
                </div>
              </IceCreamCard>
            )
          )}
        </IceCreamCardContainer>
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
