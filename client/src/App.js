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

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);

  // Load token from localStorage on app mount
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Routes>
          {/* 🏠 Home or Dashboard */}
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

          {/* 🧭 Dashboard */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          {/* 🛒 User-specific shopping list */}
          <Route
            path="/shopping"
            element={
              isAuthenticated ? (
                <>
                  <ItemModal />
                  <ShoppingList userId={user?._id} />
                </>
              ) : (
                <Navigate to="/login" />
              )
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
