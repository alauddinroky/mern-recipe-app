// Frontend code
// Filename - App.js
// Filename - App.js

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyForm from "./components/RecipeForm/RecipeForm";
import Form from "./components/form/Form";
import FoodItem from "./components/FoodItem/FoodItem";
import Recipes from "./components/RecipeItems/Recipes";
import NavBar from "./components/Header/Header";
import Cart from "./components/CartItems/CartItems";
import RecipesList from "./components/RecipesList/RecipesList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
function App() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(name);
  //   let result = await fetch("http://localhost:8000/register", {
  //     method: "post",
  //     body: JSON.stringify({ name, email }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   result = await result.json();
  //   console.log(result);
  //   console.warn(result);
  //   if (result) {
  //     alert("Data saved successfully");
  //     setEmail("");
  //     setName("");
  //   }
  // };
  const [cartItems, setCartItems] = useState([]);
  const deleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
  };
  return (
    <>
      {/* <Form /> */}
      <Router>
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <Recipes cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/add-item" element={<MyForm />} />
          {/* cart route */}
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onDelete={deleteItem}
              />
            }
          />
          <Route path="/list" element={<RecipesList />} />

          <Route path="/login" element={<Login />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Router>

      {/* <Header />
      <FoodItem /> */}
    </>
  );
}

export default App;
