import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  handleButton = () => {
    const { adcCartItem, thumbnail, price, title, id } = this.props;
    const item = { thumbnail, price, title, id };
    adcCartItem(item);
  };

  render() {
    const { thumbnail, price, title, id } = this.props;
    return (
      <div data-testid="product" className="product-card">
        <Link data-testid="product-detail-link" to={ `/${id}` }>
          <div className="img-div">
            <img src={ thumbnail } alt={ title } />
          </div>
          <div className="info-div">
            <h2 data-testid="shopping-cart-product-name">{title}</h2>
            <div className="price">
              <span>{price}</span>
            </div>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          // data-testid="product-detail-add-to-cart"
          onClick={ this.handleButton }
        >
          Adicionar ao Carrinho
        </button>
        <span data-testid="shopping-cart-product-quantity"> 1 </span>
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  adcCartItem: propTypes.func,
  id: propTypes.string.isRequired,
};

ProductCard.defaultProps = {
  adcCartItem: null,
};

export default ProductCard;
