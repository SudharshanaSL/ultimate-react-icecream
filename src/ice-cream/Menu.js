import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import { Helmet } from 'react-helmet';

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getMenu().then(menuData => {
      if (isMounted) {
        setMenu(menuData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      {menu.length ? (
        <ul className="container">
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <li key={id.toString()}>
                <section className="card">
                  <div className="image-container"></div>
                  <div className="text-container">
                    <h3>{iceCream.name}</h3>
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
        <p>Your menu is empty! The sadness!</p>
      )}
    </main>
  );
};

export default Menu;
