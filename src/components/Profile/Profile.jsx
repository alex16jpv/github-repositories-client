import React from "react";
import PropTypes from "prop-types";
import { logout } from "../../utils/login";

const Profile = ({ handleInputChange, profileInfo, error }) => {
  return (
    <section>
      <h2>Profile</h2>
      {error && <div className="alert">is correct your github username?</div>}
      <form>
        <div className="form-group text-left">
          <label>Github Username: </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Github username"
            onChange={handleInputChange}
            value={profileInfo.username}
          />
        </div>
      </form>
      <button onClick={logout}>Log Out</button>
    </section>
  );
};

Profile.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  profileInfo: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Profile;
