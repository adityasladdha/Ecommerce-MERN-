import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user ? user.name : "User"}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {user && user.avatar && (
                <img src={user.avatar.url} alt={user.name} />
              )}
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user ? user.name : "N/A"}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user ? user.email : "N/A"}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{user ? String(user.createdAt).substr(0, 10) : "N/A"}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
