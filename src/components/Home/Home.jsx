import React, { useState, useEffect } from "react";
import Repositories from "../Repositories/Repositories";
import Profile from "../Profile/Profile";
import makeRequest from "../../utils/request";
import { Redirect } from "react-router-dom";
import { setItem, getItem } from "../../utils/localStorage";

const Home = () => {
  const [error, setError] = useState(true);
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    limit: 100,
    email: "",
    avatar: "",
  });
  const [repositories, setRepositories] = useState([]);
  const [likedRepositories, setLikedRepositories] = useState([]);

  const setUsername = (username) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      username,
    }));
  };

  const getGithubInformation = () => {
    makeRequest(profileInfo.username, profileInfo.limit).then((result) => {
      if (result.errors) {
        setError(true);
      } else {
        setError(false);
        setRepositories(
          result.data.user.repositories.nodes.map((item) => {
            return { ...item, liked: false };
          })
        );
      }
    });
  };

  const setLike = (id) => {
    const newRepositories = repositories.map((repository) => {
      if (repository.databaseId === id) {
        return { ...repository, liked: true };
      }
      return repository;
    });
    setRepositories(newRepositories);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setProfileInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (!profileInfo.username) {
      setUsername(getItem("username"));
    } else {
      getGithubInformation();
      setItem("username", profileInfo.username);
    }
  }, [profileInfo.username]);

  useEffect(() => {
    const likes = repositories.filter((repository) => repository.liked);
    setLikedRepositories(likes);
  }, [repositories]);

  if (getItem("isLogged") !== "true") {
    return <Redirect to="/login" />;
  }

  return (
    <section>
      <Profile
        handleInputChange={handleInputChange}
        profileInfo={profileInfo}
        error={error}
      />
      <hr />
      <Repositories
        repositories={repositories}
        setLike={setLike}
        likedRepositories={likedRepositories}
        error={error}
      />
    </section>
  );
};

export default Home;
