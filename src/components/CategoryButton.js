import React from 'react';
import propTypes from 'prop-types';

class CategoryButton extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <button
        data-testid="category"
        type="button"
        className="category-button"
      >
        { category }
      </button>
    );
  }
}

CategoryButton.propTypes = {
  category: propTypes.string.isRequired,
};

export default CategoryButton;
