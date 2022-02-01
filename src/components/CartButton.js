import React from 'react';

import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    // retirei a props savedItems pq passamos a salvar o carrinho no
    // localStorage e não mais no estado. Mas ainda vale lembrar que
    // é possivel passar props por Link.
    return (
      <Link
        data-testid="shopping-cart-button"
        className="cart-link"
        to={ {
          pathname: '/cart',
        } }
      >
        <span>Carrinho</span>
      </Link>

    );
  }
}

export default CartButton;
