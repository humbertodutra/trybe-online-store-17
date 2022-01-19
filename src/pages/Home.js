import React from 'react';
import CartButton from '../components/CartButton';

class Home extends React.Component {
  render() {
    return (
      <main className="home-page">
        <CartButton />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </main>
    );
  }
}

export default Home;
