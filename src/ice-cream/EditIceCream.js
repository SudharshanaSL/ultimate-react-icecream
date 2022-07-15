import React, { useEffect, useState, useRef } from 'react';
import { getMenuItem, putMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamImage from './IceCreamImage';
import useUniqueIds from '../hooks/useUniqueIds';
import Main from '../structure/Main';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../utils/validator';
import useValidation from '../hooks/useValidation';
import ErrorContainer from './ErrorContainer';

const EditIceCream = ({ history, match }) => {
  /**
   * It is always a good idea to initialize form bound state elements
   * Else, if undefined values are bound to form,
   * there will be uncontrolled form elements throwing warnings
   */
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    quantity: '0',
    inStock: true,
    description: '',
    iceCream: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [descriptionId, quantityId, priceId, inStockId] = useUniqueIds(4);

  const descriptionError = useValidation(
    menuItem.description,
    validateDescription
  );
  const quantityError = useValidation(
    menuItem.quantity,
    validateQuantity,
    menuItem.inStock
  );
  const priceError = useValidation(menuItem.price, validatePrice);

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
          history.replace('/', {
            focus: true,
          });
        }
      });
  }, [match.params.menuItemId, history]);

  const onChangeHandler = e => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== 0;
    }
    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0';
    }
    setMenuItem(newMenuItemData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!descriptionError && !quantityError && !priceError) {
      const { id, price, inStock, quantity, description, iceCream } = menuItem;
      const submitItem = {
        iceCream: {
          id: iceCream.id,
        },
        id,
        price: parseFloat(price),
        inStock,
        quantity: parseInt(quantity),
        description,
      };
      putMenuItem(submitItem).then(() => {
        history.push('/', {
          focus: true,
        });
      });
    }
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>
                Description<span aria-hidden="true">*</span>
              </label>
              <ErrorContainer
                errorText={descriptionError}
                hasSubmitted={hasSubmitted}
              >
                <textarea
                  id={descriptionId}
                  name="description"
                  rows="3"
                  value={menuItem.description}
                  onChange={onChangeHandler}
                />
              </ErrorContainer>
              <label htmlFor={inStockId}>In Stock:</label>
              <div className="checkbox-wrapper">
                <input
                  id={inStockId}
                  type="checkbox"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onChangeHandler}
                />
                <div className="checkbox-wrapper-checked" />
              </div>
              <label htmlFor={quantityId}>Quantity :</label>
              <ErrorContainer
                errorText={quantityError}
                hasSubmitted={hasSubmitted}
              >
                <select
                  id={quantityId}
                  name="quantity"
                  onChange={onChangeHandler}
                  value={menuItem.quantity}
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </ErrorContainer>
              <label htmlFor={priceId}>
                Price<span aria-hidden="true">*</span>
              </label>
              <ErrorContainer
                errorText={priceError}
                hasSubmitted={hasSubmitted}
              >
                <input
                  id={priceId}
                  name="price"
                  type="number"
                  step="0.01"
                  value={menuItem.price}
                  onChange={onChangeHandler}
                />
              </ErrorContainer>
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
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
