import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RepositoryList = ({ title, list, setLike, likeFlag }) => {
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  useEffect(() => {
    if (filter.length <= 0) {
      setFilteredList(list);
    } else {
      const result = filteredList.filter((item) => {
        return item.name.includes(filter);
      });
      setFilteredList(result);
    }
  }, [filter]);

  useEffect(() => {
    setFilteredList(list);
    setFilter("");
  }, [list]);

  return (
    <div>
      <h2>{title}</h2>
      <form>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="search"
          value={filter}
          onChange={handleInputChange}
        />
      </form>
      <div className="listContainer">
        {filteredList.map((listItem) => (
          <div className="card" key={listItem.databaseId}>
            {`${listItem.name} `}
            <a target="_blank" rel="noreferrer" href={listItem.url}>
              go to
            </a>

            {likeFlag && (
              <button
                className="like"
                onClick={() => {
                  setLike(listItem.databaseId);
                }}
              >
                like
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

RepositoryList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array,
  setLike: PropTypes.func,
  likeFlag: PropTypes.bool,
};

RepositoryList.defaultProps = {
  list: [],
  setLike: () => {},
  likeFlag: false,
};

export default RepositoryList;
