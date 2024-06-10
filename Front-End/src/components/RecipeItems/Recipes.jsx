import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import Header from "../Header/Header";
import { fetchRecipes } from "../../redux/recipeActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Recipes = ({ cartItems, setCartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipeList, error, loading } = useSelector((state) => state.recipes);
  // const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("AuthVerification"));
    try {
      if (!token) {
        navigate("/login", {
          state: {
            message: "Please login to enter the page",
          },
        });
        return;
      }
      dispatch(fetchRecipes());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    if (error) {
      navigate("/login", {
        state: {
          message: "token expired, please login to enter the page",
        },
      });
      return;
    }
  });
  return (
    <>
      <Header />
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <h4>Loading.....</h4>
      ) : (
        recipeList.data && (
          <Recipe
            recipes={recipeList.data}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )
      )}
    </>
  );
};

export default Recipes;
