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
import './styles/ice-cream.scss';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/menu-items/:menuItemId" component={EditIceCream} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
