import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setItem } from "../../utils/localStorage";
import { userLogin } from "../../utils/login";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await userLogin(loginInfo);
    if (result.error === false) {
      setItem("username", loginInfo.username);
      setItem("isLogged", true);
      window.location.replace("/");
    } else {
      alert(result.errorMessage);
    }
  };

  return (
    <form>
      <h1>Login</h1>
      <div>
        <label>username </label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleInputChange}
          value={loginInfo.email}
        />
      </div>
      <div>
        <label>Password </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={loginInfo.password}
          required
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
      <hr />
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
