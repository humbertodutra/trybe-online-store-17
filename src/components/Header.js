import React from 'react';
import CartButton from './CartButton';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1 className="title">Trybe Online Store</h1>
        <CartButton />
      </header>
    );
  }
}

export default Header;
