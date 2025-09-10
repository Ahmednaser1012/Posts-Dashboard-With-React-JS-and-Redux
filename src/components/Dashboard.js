import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Sidebar from './Layout/Sidebar';

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Get current page title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/data':
        return 'Data Management';
      case '/settings':
        return 'Settings';
      case '/sweetalert':
        return 'SweetAlert Demo';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="ml-4 text-lg font-semibold text-gray-900">Admin Panel</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm hidden sm:inline">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop header */}
        <nav className="bg-white shadow-sm border-b border-gray-200 hidden lg:block">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;