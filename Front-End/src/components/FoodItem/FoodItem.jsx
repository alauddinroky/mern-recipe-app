import React from "react";
import salad1 from "../../assets/fruity-salad1.png";
import salad2 from "../../assets/fruity-salad2.png";
import salad3 from "../../assets/fruity-salad3.png";
import { data } from "../../data";

import "./foodItem.css";
import Food from "./Food";
function FoodItem() {
  const addItemToCart = async (e, id) => {
    e.preventDefault();
    const idV = id;
    console.log(e.target);
    let result = await fetch("http://localhost:5000/additem", {
      method: "post",
      body: JSON.stringify({ idV }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    console.warn(result);
    if (result) {
      alert(result.message);
    }
  };
  return (
    <section className="food-item">
      <div className="top">
        <h3 className="yellow">MENU YANG MEMBUATMU JATUH CINTA</h3>
        <h2>
          ENJOY THE BEST MENU AND GET{" "}
          <span className="yellow"> DISCOUNTS </span> AVAILABLE
        </h2>
      </div>
      <div className="bottom">
        {/* <Food /> */}
        {data.map((sinData) => {
          const { title, price, img, id } = sinData;
          return (
            <Food
              title={title}
              price={price}
              img={img}
              key={id}
              fn={addItemToCart}
              id={id}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FoodItem;
