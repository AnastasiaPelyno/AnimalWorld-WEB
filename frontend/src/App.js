// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import Orders from './pages/OrdersPage';
import './styles/styles.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await fetch('https://animalworld-web.onrender.com/api/users/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        handleLogout(); 
      }
    } catch (error) {
      console.error('Не вдалося отримати профіль користувача:', error);
    }
  }, []); 

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      fetchUserProfile(token);
    }
  }, [fetchUserProfile]);

  const handleLogin = (data) => {
    localStorage.setItem('access', data.token);
    setIsAuthenticated(true);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleUpdateProfile = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile user={user} onUpdateProfile={handleUpdateProfile} /> : <Login onLogin={handleLogin} />}
        /> 
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} /> {/* Added route for CartPage */}
        <Route path="/checkout" element={<CheckoutSuccessPage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
