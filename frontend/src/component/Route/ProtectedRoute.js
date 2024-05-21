import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom"; // Correct import

const ProtectedRoute = ({ isAdmin, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null; // or loading spinner, based on your preference
  }

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          isAdmin && user.role !== "admin" ? (
            <Navigate to="/login" /> // Corrected import
          ) : (
            <React.Fragment {...rest} />
          )
        ) : (
          <Navigate to="/login" /> // Corrected import
        )
      }
    />
  );
};

export default ProtectedRoute;
