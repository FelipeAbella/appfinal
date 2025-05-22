import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/Login';
import Dashboard from './Pages/Dashboard';
import ChildAccess from './components/ChildAccess';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PARENT, ROLES.MOTHER]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child-access"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CHILD]}>
            <ChildAccess />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;