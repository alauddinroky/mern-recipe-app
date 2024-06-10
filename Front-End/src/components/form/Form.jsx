import React, { useState } from "react";
import "./form.css";
function Form() {
  const [value, setValue] = useState({
    email: "",
    name: "",
    phone: "",
  });
  function handleValue(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify(value),
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
    <div className="container">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleValue}
      />
      <input
        type="text"
        name="name"
        placeholder="Patients Name"
        onChange={handleValue}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleValue}
      />
      <input
        type="submit"
        name="submit"
        value="Book Appointment"
        onClick={handleOnSubmit}
      />
    </div>
  );
}

export default Form;
