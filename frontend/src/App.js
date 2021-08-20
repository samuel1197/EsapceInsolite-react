import React from 'react';
import data from './data';
function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">Espace Insolite</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Connexion</a>
                </div>
            </header>
            <main>
                <div className="row center">
                  {
                    data.products.map(products => (
                      <div key={products._id} className="card">
                        <a href={`/product/${products._id}`}>
                            <img src={products.image} alt="bulle" />
                        </a>
                        <div className="card-body">
                          <a href={`/product/${products._id}`}>
                                <h2>{products.name}</h2>
                            </a>
                            <div className="rating">
                                <span>{products.rating}<i className="fa fa-star"></i></span>
                            </div>
                            <div className="price">
                              {products.price}€
                            </div>
                        </div>
                    </div>
                    ))
                  }
                </div>
            </main>
            <footer className="row center">All right Reserved</footer>
        </div>
  );
}

export default App;
