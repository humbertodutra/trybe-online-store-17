import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link className="title" to="/">
          <h1>Trybe Online Store</h1>
        </Link>
        <CartButton />
      </header>
    );
  }
}

export default Header;
