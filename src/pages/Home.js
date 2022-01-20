import React from 'react';
import CartButton from '../components/CartButton';
import CategoryButton from '../components/CategoryButton';
import ProductCard from '../components/ProductCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import '../styles/categoryList.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      search: '',
      APIresult: [],
      status: '',
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  handleChange = async ({ target: { value } }) => {
    this.setState({ search: value });
  };

  fetchProducts = async (id = '') => {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(id, search);
    if (products.results.length === 0) this.setState({ status: 'not found' });
    else this.setState({ APIresult: products.results, status: '' });
  };

  render() {
    const { categories, search, APIresult, status } = this.state;
    return (
      <main className="home-page">
        <CartButton />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <input
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          type="button"
          onClick={ this.fetchProducts }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        {status === 'not found' ? (
          <span> Nenhum produto foi encontrado </span>
        ) : (
          <div>
            {APIresult.map((product) => (
              <ProductCard
                key={ product.id }
                price={ product.price }
                thumbnail={ product.thumbnail }
                title={ product.title }
              />
            ))}
          </div>
        )}
        <aside className="aside">
          <nav className="category-list">
            {categories.map((category) => (
              <CategoryButton
                key={ category.id }
                category={ category }
                search={ search }
                fetchProducts={ this.fetchProducts }
              />
            ))}
          </nav>
        </aside>
      </main>
    );
  }
}

export default Home;
