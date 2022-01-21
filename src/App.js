import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

// Teste 1

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/:id" component={ ProductDetails } />
        <Route path="/" component={ Home } />
      </Switch>
    </Router>
  );
}

export default App;
