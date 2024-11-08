import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./Cart.css";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.products.cart);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown">
        <h3>Cart</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.images[0]} alt={item.title} />
              <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
