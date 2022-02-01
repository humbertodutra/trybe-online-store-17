import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import adcCartItem from '../services/addCart';

const URL_BASIS = 'https://api.mercadolibre.com/items/';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      email: '',
      rating: '',
      comment: '',
      reviews: [],
    };
  }

  componentDidMount() {
    this.callDetails();
    this.getData();
  }

  getData = () => {
    const dados = JSON.parse(localStorage.getItem('reviews'));
    if (dados) this.setState({ reviews: dados });
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

   handleChange = ({ target }) => {
     const { name, value } = target;
     this.setState({
       [name]: value,
     });
   };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, rating, comment } = this.state;
    const review = { email, rating, comment };
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, review],
      email: '',
      rating: '',
      comment: '',
    }), () => this.saveItem());
  }

  saveItem = () => {
    const { reviews } = this.state;
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  render() {
    // Fiz um componente para o Header, já que estavamos repetindo código
    // em cada página é só chamar o Header.
    const { product, email, comment, reviews } = this.state;
    return (
      <>
        <Header />
        <main className="detais-page">
          <section className="details-container">
            <h1 data-testid="product-detail-name">{product.title}</h1>
            <div>
              <img src={ product.thumbnail } alt={ product.title } />
            </div>
            <div>{product.price}</div>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => adcCartItem(product) }
            >
              Adicionar ao Carrinho
            </button>
          </section>
          <form onSubmit={ this.handleSubmit }>
            <h1>Avaliações</h1>
            <input
              name="email"
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              name="rating"
              type="radio"
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
            />
            <input
              name="rating"
              type="radio"
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
            <input
              name="rating"
              type="radio"
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
            <input
              name="rating"
              type="radio"
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />
            <input
              name="rating"
              type="radio"
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />
            <textarea
              name="comment"
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              value={ comment }
              onChange={ this.handleChange }
            />
            <button type="submit" data-testid="submit-review-btn">
              Avaliar
            </button>
          </form>
          {
            (reviews.length > 0) && (
              reviews.map((review) => (
                <div key={ review.email }>
                  <h3>{review.email}</h3>
                  <span>{review.comment}</span>
                  <br />
                  <span>
                    nota:
                    {review.rating}
                  </span>
                </div>
              ))
            )
          }
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
