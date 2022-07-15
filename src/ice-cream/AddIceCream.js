import React, { useEffect, useState, useRef } from 'react';
import { getIceCream, postMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCream from './IceCream';

const AddIceCream = ({ history, location }) => {
  const [iceCream, setIceCream] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getIceCream(location.search.split('=')[1])
      .then(item => {
        if (isMounted.current) {
          setIceCream(item);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response.status === 404 && isMounted.current) {
          history.replace('/', {
            focus: true,
          });
        }
      });
  }, [history]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(resp => {
      history.push('/', {
        focus: true,
      });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler}></IceCream>
      )}
    </Main>
  );
};

AddIceCream.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default AddIceCream;
