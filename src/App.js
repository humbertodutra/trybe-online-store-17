import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './styles/productCardLarge.css';
import './styles/ProductCardDefault.css';
import './default.css';

function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/cart" component={ Cart } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/:id" component={ ProductDetails } />
    </Switch>

  );
}

export default App;
