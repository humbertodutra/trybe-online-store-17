import React from 'react';
import CartButton from '../components/CartButton';
import CategoryButton from '../components/CategoryButton';
import ProductCard from '../components/ProductCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import '../styles/categoryList.css';
import '../styles/homePage.css';
import '../styles/mainSection.css';
import '../styles/productSection.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      search: '',
      APIresult: [],
      status: '',
      savedItens: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  adcCartItem = (item) => {
    console.log(item)
    this.setState((prevState) => ({
      savedItens: [...prevState.savedItens, item],
    }));
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
    const { categories, search, APIresult, status, savedItens } = this.state;
    return (
      <>
        {
          // Envolvi o cart button e o titulo em um header por semantica e CSS.
          // mudei a ordem do aside aqui pra cima pra ajustar ele na esquerda da página.
          // E por fim coloquei o resto em um section pra fazer o flex em relação ao aside.
        }
        <header className="header">
          <div />
          <h1 className="title">Online Store</h1>
          {/* Fonte: https://v5.reactrouter.com/web/api/Link */}
          {/* É possível passar o state através do Link */}
          <CartButton savedItens={ savedItens } />
        </header>
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
            <h1 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>

            <div className="search-div">
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
                    />
                    <button
                      infos={ product }
                      type="button"
                      data-testid="product-add-to-cart"
                      onClick={ () => this.adcCartItem(product) }
                    >
                      Adicionar ao Carrinho
                    </button>
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
