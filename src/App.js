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
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <Router>
        <Switch>
          <Route exact path="/cart" component={ Cart } />
          <Route path="/checkout" component={ Checkout } />
          <Route exact path="/:id" component={ ProductDetails } />
          <Route path="/" component={ Home } />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
