import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../Common/Logout';

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUserInfo) {
      navigate("/login");
    } else {
      setUserInfo(storedUserInfo);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      {userInfo && (
        <p className="text-lg text-gray-700 mb-6">
          Welcome, {userInfo.username}! You are logged in as <strong>Admin</strong>.
        </p>
      )}
      <Logout/>
    </div>
  );
};

export default AdminDashboard;
