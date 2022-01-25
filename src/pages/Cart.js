import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      savedItens: [],
      isDisable: false,
    };
  }

  componentDidMount() {
    if (localStorage.length > 0) this.getCartItens();
  }

  getCartItens = () => {
    const savedItens = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ savedItens });
  }

  increaseQuantity = (product) => {
    const { savedItens } = this.state;
    const newItens = savedItens.map((crrItem) => {
      if (crrItem.id === product.id) crrItem.quantity += 1;
      return crrItem;
    });
    this.setState({ savedItens: newItens, isDisable: false });
    localStorage.setItem('cartItems', JSON.stringify(savedItens));
  }

  decreaseQuantity = (product) => {
    const { savedItens } = this.state;
    if (product.quantity === 2) this.setState({ isDisable: true });
    const newItens = savedItens.map((crrItem) => {
      if (crrItem.id === product.id) crrItem.quantity -= 1;
      return crrItem;
    });
    this.setState({ savedItens: newItens });
    localStorage.setItem('cartItems', JSON.stringify(savedItens));
  }

  render() {
    const { savedItens } = this.state;
    const { isDisable } = this.state;
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
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseQuantity(produto) }
                disabled={ isDisable }
              >
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">
                { produto.quantity.toString() }
              </span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity(produto) }
              >
                +
              </button>
            </div>
          ))
        )}
        <Link to="/checkout">
          <button
            data-testid="checkout-products"
            type="button"
          >
            Finalizar Compra
          </button>
        </Link>
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
