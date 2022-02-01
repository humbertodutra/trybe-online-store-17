import React from 'react';
import { Link } from 'react-router-dom';

class keepShoppingBtn extends React.Component {
  render() {
    return (
      <Link to="/" className="keep-Shopping-btn">
        Continuar Comprando
      </Link>
    );
  }
}

export default keepShoppingBtn;
