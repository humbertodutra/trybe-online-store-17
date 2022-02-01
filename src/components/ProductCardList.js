import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCardList extends React.Component {
  render() {
    const { product, increaseQuantity, decreaseQuantity } = this.props;
    const { thumbnail, price, title, id } = product;
    return (
      <main data-testid="product" className="product-card-list">

        <Link
          data-testid="product-detail-link"
          to={ `/${id}` }
          className="product-img-link"
        >
          <img src={ thumbnail } alt={ title } />
        </Link>

        <section className="info-div-list">

          <Link
            data-testid="product-detail-link"
            to={ `/${id}` }
            className="title-link"
          >
            <h2 data-testid="shopping-cart-product-name">{title}</h2>
          </Link>

          <div className="price-card-list">
            <aside className="price-n-quantity">
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => decreaseQuantity(product) }
              >
                -
              </button>
              <span
                data-testid="shopping-cart-product-quantity"
                className="quantity-span"
              >
                {product.quantity.toString()}
              </span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => increaseQuantity(product) }
              >
                +
              </button>
              <span className="price-span">{`R$${price}`}</span>
            </aside>
          </div>
        </section>
      </main>
    );
  }
}

ProductCardList.propTypes = {
  product: propTypes.instanceOf(Object).isRequired,
  increaseQuantity: propTypes.func.isRequired,
  decreaseQuantity: propTypes.func.isRequired,
};

export default ProductCardList;
