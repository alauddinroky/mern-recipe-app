// import "./recipe.css";
import "./recipe.scss";
const Recipe = ({ recipes, cartItems, setCartItems }) => {
  return (
    <div className="recipe-container">
      {console.log(recipes)}
      {recipes?.map((recipe, index) => (
        <div key={recipe._id} className="recipe-item">
          <h2>{recipe.title}</h2>
          <div className="recipe-img">
            <img
              src={`http://localhost:5000/${recipe.imagePath}`}
              alt={recipe.title}
            />
          </div>
          {/* <p>{recipe.summary}</p> */}
          <div className="cart-price">
            <p className="price">${recipe.price}</p>
            <p
              className="cart-btn"
              onClick={() =>
                setCartItems((cartItems) => [...cartItems, recipe])
              }
            >
              Add to cart
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipe;
