import React from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';

const URL_BASIS = 'https://api.mercadolibre.com/items/';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      savedItens: [],
    };
  }

  componentDidMount() {
    this.callDetails();
  }

  adcCartItem = (item) => {
    this.setState((prevState) => ({
      savedItens: [...prevState.savedItens, item],
    }));
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
     const { product, savedItens } = this.state;
     return (
       <>
         <header className="header">
           <div />
           <h1 className="title">Online Store</h1>
           {/* Fonte: https://v5.reactrouter.com/web/api/Link */}
           {/* É possível passar o state através do Link */}
           <CartButton savedItens={ savedItens } />
         </header>
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
           <button
             type="button"
             data-testid="product-detail-add-to-cart"
             onClick={ () => this.adcCartItem(product) }
           >
             Adicionar ao Carrinho
           </button>
         </main>
       </>
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
