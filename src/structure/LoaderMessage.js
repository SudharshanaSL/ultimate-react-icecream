import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const LoaderMessage = ({ loadingMessage, doneMessage, isLoading }) => {
  const isLoadingPreviousValue = useRef(null);

  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      /**
       * if isLoading is not yet defined, code can hit this flow
       * Hence use the isLoadingPreviousValue reference 
       * and show done message only if isLoading was set
       */
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        doneMessageDelay = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }

    isLoadingPreviousValue.current = isLoading;
    return () => {
      clearTimeout(loadingMessageDelay);
      setShowLoadingMessage(false);
      clearTimeout(doneMessageDelay);
      setShowDoneMessage(false);
    };
  }, [isLoading]);

  return (
    <div aria-atomic="true" aria-live="assertive">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  );
};

LoaderMessage.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  doneMessage: PropTypes.string.isRequired,
};

export default LoaderMessage;
