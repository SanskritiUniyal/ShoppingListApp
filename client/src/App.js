import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useSelector } from 'react-redux';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import ProtectedPage from './pages/ProtectedPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <ItemModal />
                  <ShoppingList />
                </>
              ) : (
                <Home />
              )
            }
          />  
          {/* Auth-related routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                  
          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />     
           <Route
            path="/shopping"
            element={
              <PrivateRoute>
                <ShoppingListPage />
              </PrivateRoute>
            }
          />
          {/* 404 fallback */ }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
