import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { moveToCart } from "../../features/productSlice";
import "./Favorites.css";
import { FaShoppingCart } from "react-icons/fa";

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state: RootState) => state.products.favorites
  );

  const handleMoveToCart = (item: any) => {
    dispatch(moveToCart(item));
  };
  return (
    <div className="favorites-dropdown-container">
      <div className="favorites-dropdown">
        <h3>Favorites</h3>
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <div key={item.id} className="favorites-item">
              <img src={item.images[0]} alt={item.title} />
              <div className="favorites-item-details">
                <h4 className="favorites-item-title">{item.title}</h4>
              </div>
              <FaShoppingCart
                onClick={() => handleMoveToCart(item)}
                size={24}
                style={{ marginTop: "15px" }}
              />
            </div>
          ))
        ) : (
          <p>No Favorite Items Added.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
