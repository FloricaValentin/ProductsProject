import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchProducts,
  addToCart,
  addToFavorites,
  setSelectedProduct,
} from "../../features/productSlice";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, currentPage, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      dispatch(fetchProducts(currentPage));
    }
  };

  const handleAddToCart = (id: string) => {
    dispatch(addToCart(id));
    console.log("Adding to cart:", id);
  };

  const handleAddToFavorites = (id: string) => {
    dispatch(addToFavorites(id));
  };

  const handleProductClick = (id: string) => {
    dispatch(setSelectedProduct(id));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating + 0.5);
    const emptyStars = 5 - fullStars;

    const stars = [
      ...Array(fullStars).fill("★"),
      ...Array(emptyStars).fill("☆"),
    ];

    return stars.map((star, index) => (
      <span key={index} className={star === "★" ? "stars full" : "stars empty"}>
        {star}
      </span>
    ));
  };

  return (
    <div className="product-list" onScroll={handleScroll}>
      {products.map((product) => (
        <div
          className="product-card"
          onClick={() => handleProductClick(product.id)}
          key={product.id}
        >
          <img src={product.images[0]} alt={product.title} />
          <div className="product-details">
            <div className="product-header">
              <h2>{product.title}</h2>
              <div className="price-discount">
                <span className="price">Price: {product.price} $</span>
                {product.discountPercentage ? (
                  <span className="discount">
                    Discount: {product.discountPercentage.toFixed(2)}%
                  </span>
                ) : (
                  <span className="discount">Discount: 0</span>
                )}
              </div>
            </div>
            <p className="description">{product.description}</p>
            <div className="rating">
              {renderStars(product.rating)}
              <span>{product.rating} / 5</span>
            </div>
            <div className="button-container">
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
              >
                Add to cart
              </button>
              <span
                className="favorite-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(product.id);
                }}
              >
                ☆
              </span>
            </div>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductList;
