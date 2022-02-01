import React from 'react';
import { Link } from 'react-router-dom';

class CheckoutBtn extends React.Component {
  render() {
    return (
      <Link to="/checkout">
        <button
          data-testid="checkout-products"
          type="button"
          className="checkout-button"
        >
          Finalizar Compra
        </button>
      </Link>
    );
  }
}

export default CheckoutBtn;
