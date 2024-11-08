import React, { useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductViewer from "./components/ProductViewer/ProductViewer";
import Cart from "./components/Cart/Cart";
import Favorites from "./components/Favorites/Favorites";
import "./App.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const App: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  const toggleCart = () => setCartOpen((prev) => !prev);
  const toggleFavorites = () => setFavoritesOpen((prev) => !prev);

  return (
    <div className="app">
      <header>
        <button onClick={toggleCart}>
          <FaShoppingCart size={24} />
        </button>
        <button onClick={toggleFavorites}>
          <FaStar size={24} />
        </button>
      </header>
      {isCartOpen && <Cart />}
      {isFavoritesOpen && <Favorites />}
      <main>
        <div className="product-list-container">
          <ProductList />
        </div>
        <div>
          <ProductViewer />
        </div>
      </main>
    </div>
  );
};

export default App;
