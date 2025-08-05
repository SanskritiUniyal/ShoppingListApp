// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { loadUser } from './actions/authActions';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Routes>
          {/* 🏠 Home or Shopping List */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <ItemModal />
                  <ShoppingList userId={user?._id} />
                </>
              ) : (
                <Home />
              )
            }
          />

          {/* 🔐 Authentication */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />

          {/* 🧭 Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* 🛒 Protected Shopping Page */}
          <Route
            path="/shopping"
            element={
              <PrivateRoute>
                <>
                  <ItemModal />
                  <ShoppingList userId={user?._id} />
                </>
              </PrivateRoute>
            }
          />

          {/* ❌ Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
