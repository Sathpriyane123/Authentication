// src/components/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/AuthSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      const { isAdmin, username } = userInfo;
      const dataKey = isAdmin ? 'adminData' : 'userData';
      const userData = JSON.parse(localStorage.getItem(dataKey)) || [];

      const updatedData = userData.map((u) =>
        u.username === username ? { ...u, isLoggedIn: false } : u
      );

      localStorage.setItem(dataKey, JSON.stringify(updatedData));
    }

    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="btn-logout bg-red-600 text-white w-16 h-9">
      Logout
    </button>
  );
};

export default Logout;
