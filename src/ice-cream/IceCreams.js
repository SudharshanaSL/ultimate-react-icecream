import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import { getIceCreams } from '../data/iceCreamData';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import PropTypes from 'prop-types';

const IceCreams = ({ history }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getIceCreams().then(response => {
      if (isMounted) {
        console.log(response);
        setIceCreams(response);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage='="Loading stock list'
        doneMessage="Loading stock list complete"
        isLoading={isLoading}
      ></LoaderMessage>
      {iceCreams.length ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              heading={name}
              iceCreamId={id}
              history={history}
              to={{
                pathname: '/menu-items/add',
                search: `?iceCreamId=${id.toString()}`,
              }}
              key={id}
            ></IceCreamCard>
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your meanu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

IceCreams.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default IceCreams;
