import React from 'react';
import propTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class Cart extends React.Component {
  somaUm = (quantity) => {
    
    return quantity;
  }

  render() {
    const {
      location: {
        state: { savedItens },
      },
    } = this.props;
    return (
      <main>
        {savedItens.length === 0 ? (
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>
        ) : (
          savedItens.map((produto) => (
            <div key={ produto.id }>
              <ProductCard
                price={ produto.price }
                thumbnail={ produto.thumbnail }
                title={ produto.title }
                id={ produto.id }
              />
              <span>Quantidade:</span>
              <span data-testid="shopping-cart-product-quantity"> { produto.quantity } </span>
              <button type="button" data-testid="product-decrease-quantity"> - </button>
              <button type="button" data-testid="product-increase-quantity" onClick={ () => this.somaUm(produto.state.quantity) }> + </button>

            </div>
          ))
        )}
      </main>
    );
  }
}

Cart.propTypes = {
  location: propTypes.shape({
    state: propTypes.shape({
      savedItens: propTypes.arrayOf(propTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Cart;
