import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
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
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};

export default ProductCard;
