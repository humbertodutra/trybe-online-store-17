import React from 'react';
import propTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, price, title } = this.props;
    return (
      <div data-testid="product" className="product-card">
        <div className="img-div">
          <img src={ thumbnail } alt={ title } />
        </div>
        <div className="info-div">
          <h2>{ title }</h2>
          <div className="price">
            <span>{ price }</span>
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
};

export default ProductCard;
