import React from 'react';
import {
  BrowserRouter as Router,
  // Redirect will redirect route to specified path if none matches
  // Switch component will ensure routing to first match
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import EditIceCream from './ice-cream/EditIceCream';
import IceCreams from './ice-cream/IceCreams';
import AddIceCream from './ice-cream/AddIceCream';
import './styles/ice-cream.scss';

const App = () => {
  return (
    <Router>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/menu-items/add" component={AddIceCream} exact />
        <Route path="/menu-items/:menuItemId" component={EditIceCream} />
        <Route path="/ice-creams" component={IceCreams} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
