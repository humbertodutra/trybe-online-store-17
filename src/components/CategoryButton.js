import React from 'react';
import propTypes from 'prop-types';

class CategoryButton extends React.Component {
  render() {
    const { category, fetchProducts } = this.props;
    return (
      <button
        data-testid="category"
        type="button"
        className="category-button"
        onClick={ fetchProducts(category.id) }
      >
        { category.name }
      </button>
    );
  }
}

CategoryButton.propTypes = {
  category: propTypes.string.isRequired,
  fetchProducts: propTypes.func.isRequired,
};

export default CategoryButton;
