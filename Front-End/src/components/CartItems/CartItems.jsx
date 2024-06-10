import React from "react";
import "./Cart.scss"; // Import the SCSS file for styles
import { MdDelete } from "react-icons/md";
import Header from "../Header/Header";
const CartItem = ({ item, onDelete }) => {
  function deleteCart(id) {
    onDelete(id);
  }
  return (
    <div className="cart-item">
      <img
        className="item-image"
        src={`http://localhost:5000/${item.imagePath}`}
        alt={item.name}
      />
      {/* Show image */}
      <div className="item-details">
        <span className="name">{item.title}</span> <br />
        <span className="price">${item.price}</span>
      </div>
      <span onClick={() => deleteCart(item._id)} className="delete-icon">
        <MdDelete />
      </span>
    </div>
  );
};

const Cart = ({ cartItems, setCartItems }) => {
  const deleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  console.log(cartItems);
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="cart">
          <h2>Cart</h2>
          <div className="empty-cart-message">Your cart is empty.</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="cart">
        <h2>Cart</h2>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItem key={item._id} item={item} onDelete={deleteItem} />
          ))}
        </div>
        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
      </div>
    </>
  );
};

export default Cart;
