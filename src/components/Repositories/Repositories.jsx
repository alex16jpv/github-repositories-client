import "./repositories.css";
import React from "react";
import PropTypes from "prop-types";
import RepositoryList from "./RepositoryList";

const Repositories = ({ repositories, likedRepositories, setLike, error }) => {
  const renderRepositories = () => {
    if (error) {
      return <div className="alert">Repositories not found</div>;
    } else {
      return (
        <section className="repositories">
          <RepositoryList
            list={repositories}
            setLike={setLike}
            title="Your repositories"
            likeFlag
          />
          <RepositoryList list={likedRepositories} title="Favorite repositories" />
        </section>
      );
    }
  };

  return renderRepositories();
};

Repositories.propTypes = {
  repositories: PropTypes.array,
  likedRepositories: PropTypes.array,
  setLike: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Repositories;
