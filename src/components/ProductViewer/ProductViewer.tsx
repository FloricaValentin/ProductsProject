import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addToCart, addToFavorites } from "../../features/productSlice";
import "./ProductViewer.css";

const ProductViewer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector(
    (state: RootState) => state.products.selectedProduct
  );

  if (!selectedProduct) {
    return <p>Select a product to view details.</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct.id));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(selectedProduct.id));
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
    <div className="product-viewer">
      <div className="product-viewer-header">
        <h2>{selectedProduct.title}</h2>
        <div className="price-discount">
          <span className="price">Price: {selectedProduct.price} $</span>
          {selectedProduct.discountPercentage ? (
            <span className="discount">
              Discount: {selectedProduct.discountPercentage} %
            </span>
          ) : (
            <span className="no-discount">No Discount Avalaible</span>
          )}
        </div>
        <div className="rating">
          {renderStars(selectedProduct.rating)}
          <span>{selectedProduct.rating} / 5</span>
        </div>
      </div>
      <img
        className="image"
        src={selectedProduct.images[0]}
        alt={selectedProduct.title}
        style={{ width: "100%", height: "300px", objectFit: "contain" }}
      />
      <div className="description">
        <p>Description: {selectedProduct.description}</p>
      </div>
      <div className="dimensions">
        {selectedProduct.dimensions && (
          <p>
            Dimensions:
            {`Width: ${selectedProduct.dimensions.width} cm, `}
            {`Height: ${selectedProduct.dimensions.height} cm, `}
            {`Depth: ${selectedProduct.dimensions.depth} cm`}
          </p>
        )}
      </div>
      <div className="weight">
        <p>Weight: {selectedProduct.weight} kg</p>
      </div>
      <div className="button-container">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button className="favorite-button" onClick={handleAddToFavorites}>
          ⭐
        </button>
      </div>
    </div>
  );
};

export default ProductViewer;
