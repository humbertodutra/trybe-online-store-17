import React from 'react';
import propTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, price, title } = this.props;
    return (
      <div data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <h5>{ price }</h5>
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
