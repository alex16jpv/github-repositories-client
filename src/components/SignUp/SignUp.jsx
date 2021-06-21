import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../utils/login";

const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSignupInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createUser(signupInfo);
    if (result.error === false) {
      setSignupInfo({
        username: "",
        password: "",
      });
      alert("User created successfully!");
      window.location.replace("/login");
    } else {
      alert(result.errorMessage);
    }
  };

  return (
    <form>
      <h1>Sign Up</h1>
      <div>
        <label>username </label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleInputChange}
          value={signupInfo.email}
        />
      </div>
      <div>
        <label>Password </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={signupInfo.password}
          required
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
      <hr />
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
};

export default SignUp;
