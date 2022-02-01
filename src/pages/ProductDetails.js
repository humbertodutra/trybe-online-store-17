import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import adcCartItem from '../services/addCart';
import '../styles/productDetails.css';

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
        <main className="details-page">
          <section className="details-page__container">
            <div className="__container--info">
              <h1
                className="__container--info--name"
                data-testid="product-detail-name"
              >
                {product.title}
              </h1>
              <img
                src={ product.thumbnail }
                alt={ product.title }
                className="__container--info--image"
              />
            </div>
            <aside className="__container--aside">
              <span
                className="__container--aside--price"
              >
                {`R$ ${product.price}`}
              </span>
              <button
                className="addCartBtn"
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ () => adcCartItem(product) }
              >
                Adicionar ao Carrinho
              </button>
            </aside>
          </section>
          <form
            onSubmit={ this.handleSubmit }
            className="details-page__form"
          >
            <h1>Deixe sua avaliação</h1>
            <label
              className="__form--label"
              htmlFor="email"
            >
              E-mail
              <input
                className="__form--input"
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@exemplo.com"
                data-testid="product-detail-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <div className="__form--rating">
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
            </div>
            <label
              htmlFor="comment"
              className="__form--label"
            >
              Seu comentário
              <textarea
                id="comment"
                className="__form--textarea"
                name="comment"
                placeholder="Mensagem (opcional)"
                data-testid="product-detail-evaluation"
                value={ comment }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="submit-review-btn"
              className="__form--submmit-btn"
            >
              Avaliar
            </button>
          </form>
          <section className="details-page__review">
            {
              (reviews.length > 0) && (
                reviews.map((review) => (
                  <div
                    key={ review.email }
                    className="__review--div"
                  >
                    <h3>{review.email}</h3>
                    <span className="--review-rating">
                      {`Nota: ${review.rating}`}
                    </span>
                    <span className="--review-comment">{review.comment}</span>
                  </div>
                ))
              )
            }
          </section>
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
