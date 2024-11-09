import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const adminData = JSON.parse(localStorage.getItem("adminData")) || [];
    const userDataArray = JSON.parse(localStorage.getItem("userData")) || [];

    const existingUser = [...adminData, ...userDataArray].find(
      (user) => user.username === username
    );

    if (existingUser) {
      alert("Username already exists");
      return;
    }

    const currentId = parseInt(localStorage.getItem("currentUserId")) || 0;
    const newUserId = currentId + 1;

    const userData = {
      id: newUserId,
      username,
      password,
      isAdmin,
    };

    console.log("User Data:", userData);

    if (isAdmin) {
      adminData.push(userData);
      localStorage.setItem("adminData", JSON.stringify(adminData));
      alert("Admin registered successfully");
    } else {
      userDataArray.push(userData);
      localStorage.setItem("userData", JSON.stringify(userDataArray));
      alert("User registered successfully");
    }

    // Save both arrays in cookies
    Cookies.set("adminData", JSON.stringify(adminData), { expires: 7 });
    Cookies.set("userDataArray", JSON.stringify(userDataArray), { expires: 7 });

    localStorage.setItem("currentUserId", newUserId);

    navigate("/sadmin/dataset");
  };

  const handleNavigate = () => {
    navigate("/sadmin/dataset");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Registration
        </h2>
        <button
          onClick={handleNavigate}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Data Set
        </button>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
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

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
              Is Admin
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
