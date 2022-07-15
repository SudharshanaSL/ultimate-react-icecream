import React, { useEffect, useState, useRef } from 'react';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCream from './IceCream';

const EditIceCream = ({ history, match }) => {
  const [menuItem, setMenuItem] = useState({
  });
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
      .then((item) => {
        if (isMounted.current) {
          setMenuItem(item);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response.status === 404 && isMounted.current) {
          /**
           * Route to home page by replacing current history state
           */
          history.replace('/', {
            focus: true,
          });
        }
      });
  }, [match.params.menuItemId, history]);

  const onSubmitHandler = updatedItem => {
    putMenuItem({
      id: menuItem.id,
      ...updatedItem,
    }).then(() => {
      history.push('/', {
        focus: true,
      });
    });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', {
        focus: true,
      });
    });
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        ></IceCream>
      )}
    </Main>
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
