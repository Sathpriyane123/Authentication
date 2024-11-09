// src/components/Logout.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../Redux/AuthSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    // Retrieve user session information from "userLogin"
    const userInfo = JSON.parse(
      Cookies.get("userLogin") || localStorage.getItem("userLogin") || "{}"
    );
    if (userInfo) {
      const { isAdmin, username } = userInfo;
      const dataKey = isAdmin ? "adminData" : "userData";

      // Update login status to false in respective data store
      const userData = JSON.parse(
        Cookies.get(dataKey) || localStorage.getItem(dataKey) || "[]"
      );
      const updatedData = userData.map((u) =>
        u.username === username ? { ...u, isLoggedIn: false } : u
      );

      Cookies.set(dataKey, JSON.stringify(updatedData), { expires: 7 });
      localStorage.setItem(dataKey, JSON.stringify(updatedData));
    }

    // Clear session data
    Cookies.remove("userLogin");
    localStorage.removeItem("userLogin");

    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn-logout bg-red-600 text-white w-16 h-9"
    >
      Logout
    </button>
  );
};

export default Logout;
