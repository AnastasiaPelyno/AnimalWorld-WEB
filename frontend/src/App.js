// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
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

  // Використовуємо useCallback для memoization функції fetchUserProfile
  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        handleLogout(); // Логаут, якщо токен недійсний
      }
    } catch (error) {
      console.error('Не вдалося отримати профіль користувача:', error);
    }
  }, []); // Використовуємо порожній масив залежностей, щоб функція не змінювалася

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      fetchUserProfile(token);
    }
  }, [fetchUserProfile]); // Тепер залежність безпечно вказана

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
