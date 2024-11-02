import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Component/Pages/Signup";
import Login from "./Component/Pages/Login";
import DataSet from "./Component/Pages/DataSet";
import ProtectedRoute from "./Component/Common/ProtectedRoute";
import UserDashboard from "./Component/Pages/UserDashboard";
import AdminDashboard from "./Component/Pages/AdminDashboard";
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent back navigation after login
    if (isAuthenticated) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }

    // Cleanup when the component is unmounted
    return () => {
      window.onpopstate = null;
    };
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Routes>
        <Route path="/sadmin" element={<Signup />} />
        <Route path="/sadmin/dataset" element={<DataSet />} />
        {/* Login Route: Not protected, accessible for unauthenticated users */}
        <Route path="/" element={<Login />} />

        {/* Protecting the dashboard routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
