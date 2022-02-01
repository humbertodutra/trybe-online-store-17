import React from 'react';
import Header from '../components/Header';
import ProductCardLarge from '../components/ProductCardLarge';
import KeepShoppingBtn from '../components/KeepShoppingBtn';
import '../styles/checkoutPage.css';

const CHECKOUT__PAGE = true;

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      savedItems: [],
    };
  }

  componentDidMount() {
    if (localStorage.length > 0) this.getCartItens();
  }

  getCartItens = () => {
    const savedItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ savedItems });
  }

  render() {
    const { savedItems } = this.state;
    let total = 0;
    return (
      <>
        <Header />
        <main className="checkout-page__main">
          <section className="__main--content">
            <ul
              className="checkoutPage__content--list"
            >
              {
                savedItems.map((crrItem) => {
                  const itemTotal = crrItem.price * crrItem.quantity;
                  total += itemTotal;
                  return (
                    <li
                      key={ crrItem.id }
                    >
                      <ProductCardLarge
                        thumbnail={ crrItem.thumbnail }
                        price={ crrItem.price }
                        title={ crrItem.title }
                        id={ crrItem.id }
                        product={ crrItem }
                        checkoutPage={ CHECKOUT__PAGE }
                        itemTotal={ itemTotal }
                      />
                    </li>
                  );
                })
              }
            </ul>
            <aside className="__main--aside">
              <span
                className="__main--total"
              >
                {`R$${(Math.round(total * 100) / 100).toFixed(2)}`}
              </span>
              <KeepShoppingBtn />
            </aside>
          </section>
          <form className="checkout-page__form" onSubmit={ this.onSubmitButtonClick }>
            <h2>Informações do Comprador</h2>
            <div className="__form--personal-info">
              <input
                data-testid="checkout-fullname"
                placeholder="Nome Completo"
                className="__form--input"
              />
              <input
                data-testid="checkout-email"
                placeholder="E-mail"
                className="__form--input"
              />
              <input
                data-testid="checkout-cpf"
                placeholder="CPF"
                className="__form--input"
              />
              <input
                data-testid="checkout-phone"
                placeholder="Telefone"
                className="__form--input"
              />
              <input
                data-testid="checkout-cep"
                placeholder="CEP"
                className="__form--input"
              />
              <input
                data-testid="checkout-address"
                placeholder="Endereço"
                className="__form--input"
              />
            </div>
            <select className="__form--select">
              <option value="" hidden>Estado</option>
              <option value="AM">AM</option>
              <option value="AP">AP</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="PI">PI</option>
              <option value="MG">MG</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PE">PE</option>
              <option value="PR">PR</option>
              <option value="RJ">RJ</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SE">SE</option>
              <option value="SP">SP</option>
              <option value="TO">TO</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="SC">SC</option>
            </select>
            <fieldset className="__form--payment">
              <legend>Forma de pagamento</legend>
              <input
                type="radio"
                value="credito"
              />
              <input
                type="radio"
                value="debito"
              />
              <input
                type="radio"
                value="boleto"
              />
            </fieldset>
            <button
              className="__form--purchase"
              type="submit"
            >
              Finalizar Compra
            </button>
          </form>
        </main>
      </>
    );
  }
}

export default Checkout;
