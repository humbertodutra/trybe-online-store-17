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
      email: '',
      rating: '',
      comment: '',
      reviews: [],
    };
  }

  componentDidMount() {
    this.callDetails();
    return (localStorage.length > 0) && this.getData();
  }

  getData = () => {
    const dados = JSON.parse(localStorage.getItem('reviews'));
    this.setState({ reviews: dados });
  }

  adcCartItem = (item) => {
    this.setState((prevState) => ({
      savedItens: [...prevState.savedItens, item],
    }));
  };

  callDetails = async () => {
    try {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const resolve = await fetch(`${URL_BASIS}${id}`);
      const data = await resolve.json();
      this.setState({
        product: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    const { product, savedItens, email, comment, reviews } = this.state;
    return (
      <>
        <header className="header">
          <div />
          <h1 className="title">Online Store</h1>
          {/* Fonte: https://v5.reactrouter.com/web/api/Link */}
          {/* É possível passar o state através do Link */}
          <CartButton savedItens={ savedItens } />
        </header>
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
              onClick={ () => this.adcCartItem(product) }
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
