import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const titles = {
  '/dashboard': 'Dashboard',
  '/faculty': 'Faculty & Subject Management',
  '/generate': 'Generate Timetable',
  '/view': 'View Timetable',
};

export default function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  const title = titles[location.pathname] || 'Dashboard';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <div className="topbar">
          <h1>{title}</h1>
          <div className="admin-pill">
            👤 {user?.username || 'Admin'}
          </div>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
