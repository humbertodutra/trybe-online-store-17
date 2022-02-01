import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import ProductCardList from '../components/ProductCardList';
import '../styles/CartPage.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      savedItens: [],
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
    this.setState({ savedItens: newItens });
    localStorage.setItem('cartItems', JSON.stringify(savedItens));
  }

  decreaseQuantity = (product) => {
    const { savedItens } = this.state;
    const newItens = savedItens.map((crrItem) => {
      if (crrItem.id === product.id) crrItem.quantity -= 1;
      return crrItem;
    });
    this.setState({ savedItens: newItens });
    localStorage.setItem('cartItems', JSON.stringify(savedItens));
  }

  render() {
    const { savedItens } = this.state;
    return (
      <>
        <Header />
        <main className="cart-page">
          <section className="cart-page__list-section">
            {savedItens.length === 0 ? (
              <h1
                data-testid="shopping-cart-empty-message"
                className="cart__not-found"
              >
                Seu carrinho está vazio 😢
              </h1>
            ) : (
              savedItens.map((product) => (
                <div key={ product.id }>
                  <ProductCardList
                    price={ product.price }
                    thumbnail={ product.thumbnail }
                    title={ product.title }
                    id={ product.id }
                    product={ product }
                    increaseQuantity={ this.increaseQuantity }
                    decreaseQuantity={ this.decreaseQuantity }
                  />
                  {
                    // Criei um componente ProductCardLarge pra usar no carrinho
                    // e joguei os botões lá dentro.
                  }
                </div>
              ))
            )}
          </section>
          {
            savedItens.length !== 0 && (
              <aside className="cart-page__aside">
                <span
                  className="cart-page__aside--price"
                >
                  Total: R$ xx,xx
                </span>
                <Link to="/checkout">
                  <button
                    data-testid="checkout-products"
                    type="button"
                    className="checkout-button"
                  >
                    Finalizar Compra
                  </button>
                </Link>
              </aside>
            )
          }
        </main>
      </>
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
