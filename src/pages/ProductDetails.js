import React from 'react';
import PropTypes from 'prop-types';

const URL_BASIS = 'https://api.mercadolibre.com/items/';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},

    };
  }

  componentDidMount() {
    this.callDetails();
  }

   callDetails = async () => {
     try {
       const { match: { params: { id } } } = this.props;
       const resolve = await fetch(`${URL_BASIS}${id}`);
       const data = await resolve.json();
       this.setState({
         product: data,
       });
     } catch (error) {
       console.log(error);
     }
   }

   render() {
     const { product } = this.state;
     return (
       <main className="details-container">
         <h1 data-testid="product-detail-name">{ product.title }</h1>
         <div>
           <img
             src={ product.thumbnail }
             alt={ product.title }
           />
         </div>
         <div>
           { product.price }
         </div>
       </main>

     );
   }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
