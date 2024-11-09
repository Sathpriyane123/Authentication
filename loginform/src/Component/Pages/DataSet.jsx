// src/components/DataSet.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function DataSet() {
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);

  // Function to load data from both localStorage and cookies
  const loadData = () => {
    try {
      const storedAdminData = JSON.parse(localStorage.getItem('adminData') || Cookies.get('adminData') || '[]');
      const storedUserData = JSON.parse(localStorage.getItem('userData') || Cookies.get('userData') || '[]');
      
      setAdminData(storedAdminData);
      setUserData(storedUserData);

      // Sync cookies if only localStorage has the data
      if (!Cookies.get('adminData')) Cookies.set('adminData', JSON.stringify(storedAdminData), { expires: 7 });
      if (!Cookies.get('userData')) Cookies.set('userData', JSON.stringify(storedUserData), { expires: 7 });
      
    } catch (error) {
      console.error("Error parsing storage data:", error);
      setAdminData([]);
      setUserData([]);
    }
  };

  useEffect(() => {
    // Initial load of data from storage
    loadData();

    // Add event listener for changes in localStorage to sync data across tabs
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateStorage = (admin, user) => {
    localStorage.setItem('adminData', JSON.stringify(admin));
    localStorage.setItem('userData', JSON.stringify(user));
    Cookies.set('adminData', JSON.stringify(admin), { expires: 7 });
    Cookies.set('userData', JSON.stringify(user), { expires: 7 });
    loadData(); // Refresh data immediately after updating storage
  };

  // Remove user/admin entry
  const handleRemove = (isAdmin, index) => {
    if (isAdmin) {
      const updatedAdmin = [...adminData];
      updatedAdmin.splice(index, 1);
      setAdminData(updatedAdmin);
      updateStorage(updatedAdmin, userData);
    } else {
      const updatedUser = [...userData];
      updatedUser.splice(index, 1);
      setUserData(updatedUser);
      updateStorage(adminData, updatedUser);
    }
  };

  // Change admin to user
  const handleSetUser = (index) => {
    const adminUser = adminData[index];
    const updatedAdmin = [...adminData];
    updatedAdmin.splice(index, 1);
    const updatedUser = [...userData, { ...adminUser, isAdmin: false }];
    setAdminData(updatedAdmin);
    setUserData(updatedUser);
    updateStorage(updatedAdmin, updatedUser);
  };

  // Change user to admin
  const handleSetAdmin = (index) => {
    const regularUser = userData[index];
    const updatedUser = [...userData];
    updatedUser.splice(index, 1);
    const updatedAdmin = [...adminData, { ...regularUser, isAdmin: true }];
    setUserData(updatedUser);
    setAdminData(updatedAdmin);
    updateStorage(updatedAdmin, updatedUser);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Table</h2>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        <Link to="/sadmin" className="block w-full text-center">
          Add new user or Admin
        </Link>
      </button>
      <div className="overflow-y-auto h-64">
        <table className="w-full border-collapse">
          <thead className="bg-blue-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{admin.username}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemove(true, index)}
                    className="px-2 py-1 mr-1 text-white bg-red-500 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleSetUser(index)}
                    className="px-2 py-1 text-white bg-yellow-500 rounded"
                  >
                    Set as User
                  </button>
                </td>
                <td className={`border px-4 py-1 text-center ${admin.isLoggedIn ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}>
                  {admin.isLoggedIn ? 'Active' : 'Not Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mb-4">User Table</h2>
      <div className="overflow-y-auto h-64">
        <table className="w-full border-collapse">
          <thead className="bg-green-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemove(false, index)}
                    className="px-2 py-1 mr-1 text-white bg-red-500 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleSetAdmin(index)}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                  >
                    Set as Admin
                  </button>
                </td>
                <td className={`border px-4 py-1 text-center ${user.isLoggedIn ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}>
                  {user.isLoggedIn ? 'Active' : 'Not Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
