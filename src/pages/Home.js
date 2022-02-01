import React from 'react';
import CategoryButton from '../components/CategoryButton';
import ProductCard from '../components/ProductCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import Header from '../components/Header';
import '../styles/homePage.css';

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
      <>
        <Header />
        {
          // Criei um componente para o Header, evitar reptir o código em cada página.
          // mudei a ordem do aside aqui pra cima pra ajustar ele na esquerda da página.
          // E por fim coloquei o resto em um section pra fazer o flex em relação ao aside.
        }
        {/* <header className="header">
          <div />
          <h1 className="title">Online Store</h1>
          {/* Fonte: https://v5.reactrouter.com/web/api/Link */}
        {/* É possível passar o state através do Link */}
        <main className="home-page">

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

          <section className="main-section">
            <div className="search-div">
              <h1 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
              <input
                className="search-input"
                type="text"
                name="search"
                value={ search }
                onChange={ this.handleChange }
                data-testid="query-input"
              />
              <button
                className="search-button"
                type="button"
                onClick={ this.fetchProducts }
                data-testid="query-button"
              >
                Pesquisar
              </button>
            </div>

            {status === 'not found' ? (
              <span> Nenhum produto foi encontrado </span>
            ) : (
              <div className="product-section">
                {APIresult.map((product) => (
                  <div key={ product.id }>
                    <ProductCard
                      price={ product.price }
                      thumbnail={ product.thumbnail }
                      title={ product.title }
                      id={ product.id }
                      product={ product }
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>
      </>
    );
  }
}

export default Home;
