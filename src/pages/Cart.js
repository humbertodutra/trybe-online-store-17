import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import ProductCardLarge from '../components/ProductCardLarge';
import CheckoutBtn from '../components/CheckoutBtn';
import KeepShoppingBtn from '../components/KeepShoppingBtn';
import '../styles/CartPage.css';

// como o ProductCardLarge é usado tanto no checkout page como no cart page
// fiz uma renderização condicional para os botões de controle de quantidade.
const CHECKOUT__PAGE = false;

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

  getCartItens = async () => {
    const itemsOnCart = await JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ savedItens: itemsOnCart });
    const { savedItens } = this.state;
    console.log(savedItens);
  }

  increaseQuantity = (product) => {
    const { savedItens } = this.state;
    const newItens = savedItens.map((crrItem) => {
      if (crrItem.id === product.id) crrItem.quantity += 1;
      return crrItem;
    });
    this.setState({ savedItens: newItens });
    localStorage.setItem('cartItems', JSON.stringify(savedItens));
    this.totalPrinceOnCart();
  }

  decreaseQuantity = (product) => {
    const { savedItens } = this.state;
    const newItens = savedItens.map((crrItem) => {
      if (crrItem.id === product.id) {
        if (crrItem.quantity > 0) crrItem.quantity -= 1;
      }
      return crrItem;
    });
    const filteredItens = newItens.filter((crrItem) => crrItem.quantity > 0);
    this.setState({ savedItens: filteredItens });
    localStorage.setItem('cartItems', JSON.stringify(filteredItens));
    this.totalPrinceOnCart();
  };

  totalPrinceOnCart = () => {
    const { savedItens } = this.state;
    if (savedItens.length === 0) return 0;
    const total = savedItens.reduce((acc, crr) => acc + (crr.price * crr.quantity), 0);
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const totalFormated = formatter.format(total);
    return totalFormated;
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
                  <ProductCardLarge
                    price={ product.price }
                    thumbnail={ product.thumbnail }
                    title={ product.title }
                    id={ product.id }
                    product={ product }
                    increaseQuantity={ this.increaseQuantity }
                    decreaseQuantity={ this.decreaseQuantity }
                    checkoutPage={ CHECKOUT__PAGE }
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
                  {savedItens.length === 0 ? 'Seu carrinho está vazio 😢'
                    : `Subtotal: ${this.totalPrinceOnCart()}`}
                </span>
                <KeepShoppingBtn />
                <CheckoutBtn />
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
