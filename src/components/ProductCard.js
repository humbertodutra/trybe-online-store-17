import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import adcCartItem from '../services/addCart';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, price, title, id, product } = this.props;
    return (
      <div data-testid="product" className="product-card">
        <Link
          data-testid="product-detail-link"
          to={ `/${id}` }
          className="product-card__link"
        >
          <div className="img-div">
            <img src={ thumbnail } alt={ title } />
          </div>
        </Link>
        <div className="info-div">
          <Link
            data-testid="product-detail-link"
            to={ `/${id}` }
            className="product-card__link"
          >
            <h2 data-testid="shopping-cart-product-name">{title}</h2>
          </Link>
          <div className="price">
            <span>{`R$${(Math.round(price * 100) / 100).toFixed(2)}`}</span>
            {
              // função Math.round para mostrar sempre 2 decimais. Ex.. 1.70
            }
          </div>
        </div>
        <button
          className="addCartBtn"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => adcCartItem(product) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  product: propTypes.instanceOf(Object).isRequired,
};

export default ProductCard;
