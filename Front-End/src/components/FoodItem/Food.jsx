import React from "react";

function Food({ title, price, img, fn, id }) {
  return (
    <div className="image" onClick={(e) => fn(e, id)}>
      <img src={img} alt="salad" />
      <div className="content">
        <span>Mini Salad Yummy</span>
        <h2>$2.99</h2>
      </div>
    </div>
  );
}

export default Food;
