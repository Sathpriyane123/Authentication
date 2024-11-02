// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/AuthSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch data from local storage
    const adminData = JSON.parse(localStorage.getItem("adminData")) || [];
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    console.log("Admin Data:", adminData); // Debugging
    console.log("User Data:", userData);   // Debugging

    // Check for matching user
    const user = adminData.concat(userData).find(
      (u) => u.username === username && u.password === password
    );

    console.log("Found User:", user); // Debugging

    if (user) {
      // Update login status
      user.isLoggedIn = true;
      if (user.isAdmin) {
        const updatedAdminData = adminData.map((u) =>
          u.username === user.username ? { ...u, isLoggedIn: true } : u
        );
        localStorage.setItem("adminData", JSON.stringify(updatedAdminData));
      } else {
        const updatedUserData = userData.map((u) =>
          u.username === user.username ? { ...u, isLoggedIn: true } : u
        );
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }

      dispatch(loginSuccess(user)); // Update Redux state

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ username: user.username, isAdmin: user.isAdmin, isLoggedIn: true })
      );

      navigate(user.isAdmin ? "/admin/dashboard" : "/user/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
