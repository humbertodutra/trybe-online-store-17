import React from 'react';
import Header from '../components/Header';
import ProductCardList from '../components/ProductCardList';

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
      <div className="checkout-page">
        <Header />
        <section className="checkout-page__content">
          <ul
            className="checkoutPage__content--list"
          />
          {
            savedItems.map((crrItem) => {
              const itemTotal = crrItem.price * crrItem.quantity;
              total += itemTotal;
              return (
                <li
                  key={ crrItem.id }
                >
                  <ProductCardList
                    thumbnail={ crrItem.thumbnail }
                    price={ crrItem.price }
                    title={ crrItem.title }
                    id={ crrItem.id }
                    product={ crrItem }
                  />
                  <span>{ `Qnt ${crrItem.quantity}` }</span>
                  <br />
                  <span>{ `Total: ${itemTotal}` }</span>
                </li>
              );
            })
          }
        </section>
        <aside className="checkout-page__aside">
          <span
            className="checkout-page__total"
          >
            {`Total =>>>> ${total}`}
          </span>
          <p>Informação do Comprador</p>
          <form className="checkout-page__form" onSubmit={ this.onSubmitButtonClick }>
            <input
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
              className="checkout-form-input"
            />
            <input
              data-testid="checkout-email"
              placeholder="E-mail"
              className="checkout-form-input"
            />
            <input
              data-testid="checkout-cpf"
              placeholder="CPF"
              className="checkout-form-input"
            />
            <input
              data-testid="checkout-phone"
              placeholder="Telefone"
              className="checkout-form-input"
            />
            <input
              data-testid="checkout-cep"
              placeholder="CEP"
              className="checkout-form-input"
            />
            <input
              data-testid="checkout-address"
              placeholder="Endereço"
              className="checkout-form-input"
            />
            <select>
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
          </form>
        </aside>
      </div>
    );
  }
}

export default Checkout;
