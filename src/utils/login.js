import { setItem, getItem } from "./localStorage";
import fetch from "node-fetch";

const makeRequest = async (path, body) => {
  console.log(body);
  const result = await fetch(`${process.env.REACT_APP_API_URL}/auth/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await result.json();
  return data;
};

const existUser = (users, username) => {
  const result = users.find((user) => user.username === username);
  return result ? true : false;
};

const loginFromBackend = async (info) => {
  const result = await makeRequest("login", info);
  return result;
};

const loginFromLocalStorage = (info) => {
  let errorMessage = "";

  if (!info.username || !info.password) {
    return {
      error: true,
      errorMessage: "username and password are required!",
    };
  }

  const users = JSON.parse(getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.username === info.username && user.password === info.password
  );

  if (!foundUser) {
    return {
      error: true,
      errorMessage: "Sorry, your info was incorrect",
    };
  }

  return {
    error: false,
    errorMessage,
  };
};

const signupFromBackend = async (info) => {
  console.log(info);
  const result = await makeRequest("signup", info);
  return result;
};

const signupFromLocalStorage = (info) => {
  let error = false;
  let errorMessage = "";

  if(!info.username || !info.password){
    return {
      error: true,
      errorMessage: "username and password are required!"
    }
  }

  const users = JSON.parse(getItem("users"));
  if (!users) {
    setItem("users", JSON.stringify([info]));
  } else {
    if (existUser(users, info.username)) {
      error = true;
      errorMessage = "User already exists!";
    } else {
      users.push(info);
      setItem("users", JSON.stringify(users));
    }
  }
  return {
    error,
    errorMessage,
    users,
  };
};

const createUser = async (signupInfo) => {
  switch (process.env.REACT_APP_LOGIN) {
    case "LOCALSTORAGE":
      return signupFromLocalStorage(signupInfo);
    case "BACKEND":
      return await signupFromBackend(signupInfo);
    default:
      return signupFromLocalStorage(signupInfo);
  }
};

const userLogin = async (loginInfo) => {
  switch (process.env.REACT_APP_LOGIN) {
    case "LOCALSTORAGE":
      return loginFromLocalStorage(loginInfo);
    case "BACKEND":
      return await loginFromBackend(loginInfo);
    default:
      return loginFromLocalStorage(loginInfo);
  }
};

const logout = () => {
  setItem("isLogged", false);
  window.location.replace("/");
};

export { userLogin, createUser, logout };
