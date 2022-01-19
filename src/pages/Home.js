import React from 'react';
import CartButton from '../components/CartButton';
import CategoryButton from '../components/CategoryButton';
import { getCategories } from '../services/api';
import '../styles/categoryList.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <main className="home-page">
        <CartButton />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <aside className="aside">
          <nav className="category-list">
            {
              categories.map((category) => (
                <CategoryButton
                  key={ category.id }
                  category={ category.name }
                />
              ))
            }

          </nav>
        </aside>
      </main>
    );
  }
}

export default Home;
