import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import files
import "./RecipesList.scss";
import { fetchRecipes } from "../../redux/recipeActions";

function RecipesList() {
  const { recipeList, error, loading } = useSelector((state) => state.recipes);
  // console.log(recipeList);
  // const [recipeList, setRecipeList] = useState([]);
  // const [error, setError] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function togglePopUp() {
    setShowPopUp(!showPopUp);
  }
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
  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("AuthVerification"));
  //   if (!token) {
  //     navigate("/login", {
  //       state: { message: "Please login before going to the list page" },
  //     }); // Redirect to login with message
  //     return;
  //   }
  //   // console.log(token);
  //   fetch("http://localhost:5000/getRecipe", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token ? token.token : ""}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`${res.error} Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setRecipeList(res.data);
  //       } else {
  //         setError(`Error: ${res.msg || "Unknown error"}`);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(`Error fetching recipes: ${error.message}`);
  //     });
  //   // .then((res) => res.json())
  //   // .then((res) => {
  //   //   if (res.status === 2000) {
  //   //     setRecipeList(res);
  //   //   } else {
  //   //     console.log(res.status);
  //   //   }
  //   // });
  // }, []);

  function deleteList(id) {
    fetch(`http://localhost:5000/deleteRecipe/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // togglePopUp();
        setShowPopUp(true);

        setTimeout(() => {
          setShowPopUp(false);
        }, [5000]);
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  }
  return (
    <>
      <div className={`popup ${showPopUp ? "active" : ""}`}>
        Recipe deleted successfully!
      </div>
      <div className="recipes-list">
        <div className="list">
          {error && <div className="error-message">{error}</div>}
          {recipeList.data &&
            recipeList.data?.map((item) => {
              return (
                <div className="cart-item" key={item._id}>
                  <img
                    className="item-image"
                    src={`http://localhost:5000/${item.imagePath}`}
                    alt={item.name}
                  />{" "}
                  {/* Show image */}
                  <div className="item-details">
                    <span className="name">{item.title}</span> <br />
                    <span className="price">${item.price}</span>
                  </div>
                  <span
                    onClick={() => deleteList(item._id)}
                    className="delete-icon"
                  >
                    Delete
                    {/* <MdDelete /> */}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default RecipesList;
