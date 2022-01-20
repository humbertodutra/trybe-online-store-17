import React from "react";
import ProductCard from "../components/ProductCard";

class Cart extends React.Component {
  constructor() {
    super();
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
            <ProductCard
              data-testid="shopping-cart-product-name"
              key={ produto.id }
              price={ produto.price }
              thumbnail={ produto.thumbnail }
              title={ produto.title }
              id={ produto.id }
            />
          ))
        )}
      </main>
    );
  }
}

export default Cart;
