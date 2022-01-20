import React from 'react';
import propTypes from 'prop-types';

class CategoryButton extends React.Component {
  handleClick = async () => {
    const { fetchProducts, category } = this.props;
    await fetchProducts(category.id);
  }

  render() {
    const { category } = this.props;
    return (
      <button
        data-testid="category"
        type="button"
        className="category-button"
        onClick={ this.handleClick }
      >
        { category.name }
      </button>
    );
  }
}

CategoryButton.propTypes = {
  category: propTypes.shape({
    name: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
  }).isRequired,
  fetchProducts: propTypes.func.isRequired,
};

export default CategoryButton;
