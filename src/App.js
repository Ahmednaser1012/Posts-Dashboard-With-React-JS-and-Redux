import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import DashboardPage from "./components/Pages/DashboardPage";
import DataPage from "./components/Pages/DataPage";
import SettingsPage from "./components/Pages/SettingsPage";
import ErrorBoundary from "./components/ErrorBoundary";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard>
                  <DashboardPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/data"
            element={
              <ProtectedRoute>
                <Dashboard>
                  <DataPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Dashboard>
                  <SettingsPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
