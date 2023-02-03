import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './styles/productCardLarge.css';
import './styles/ProductCardDefault.css';
import './default.css';

function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/:id" component={ ProductDetails } />
      </Switch>
    </Router>

  );
}

export default App;
