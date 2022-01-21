import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    const { savedItens } = this.props;
    return (
      <Link
        data-testid="shopping-cart-button"
        className="cart-link"
        to={ {
          pathname: '/cart',
          state: { savedItens },
        } }
      >
        <span>Carrinho</span>
      </Link>

    );
  }
}

CartButton.propTypes = {
  savedItens: propTypes.arrayOf(propTypes.object.isRequired).isRequired,
};

export default CartButton;
