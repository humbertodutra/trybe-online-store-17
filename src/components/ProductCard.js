import React from 'react';
import propTypes from 'prop-types';

class ProductCard extends React.Component {
  handleButton = () => {
    const { adcCartItem, thumbnail, price, title } = this.props;
    const item = { thumbnail, price, title };
    adcCartItem(item);
  }

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
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.handleButton }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  adcCartItem: propTypes.func.isRequired,
};

export default ProductCard;
