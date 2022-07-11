import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { getMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';

const EditIceCream = ({ history, match }) => {
  const [menuItem, setMenuItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * to avoid memory leak while setting menu item after api response
   */
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(match.params.menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (isMounted.current) {
          setMenuItem({
            id: parseInt(id),
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response.status === 404 && isMounted.current) {
          /**
           * Route to home page by replacing current history state
           */
          history.replace('/');
        }
      });
  }, [match.params.menuItemId, history]);

  return (
    <main>
      <Helmet>
        <title>Update this beauty | Ultimate Ice Cream App</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
    </main>
  );
};

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
