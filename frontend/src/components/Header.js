// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FiLogIn, FiUserPlus, FiLogOut, FiUser } from 'react-icons/fi';

// const Header = ({ isAuthenticated, onLogout }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     onLogout();
//     navigate('/');
//   };

//   // Перевіряємо, чи поточний шлях це реєстрація або вхід
//   const hideButtons = location.pathname === '/register' || location.pathname === '/login';

//   return (
//     <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
//       {!isAuthenticated && !hideButtons && (
//         <>
//           <Link to="/register" style={{ margin: '0 10px' }}>
//             <button className="button"><FiUserPlus /> Register</button>
//           </Link>
//           <Link to="/login" style={{ margin: '0 10px' }}>
//             <button className="button"><FiLogIn /> Login</button>
//           </Link>
//         </>
//       )}
//       {isAuthenticated && (
//         <>
//           <Link to="/profile" style={{ margin: '0 10px' }}>
//             <button className="button"><FiUser /> Profile</button>
//           </Link>
//           <button onClick={handleLogout} style={{ margin: '0 10px' }} className="button"><FiLogOut /> Logout</button>
//         </>
//       )}
//     </header>
//   );
// };
// const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     window.location.href = '/';
// };
// export default Header;

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiLogOut, FiUser,FiShoppingCart,FiList } from 'react-icons/fi';

const Header = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleLogout = () => {
      onLogout();
      localStorage.removeItem('access'); // Remove token from localStorage
      navigate('/'); // Redirect to home page
    };
  
    const hideButtons = location.pathname === '/register' || location.pathname === '/login';
  
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#f4f4f4',
            borderBottom: '1px solid #ddd'
          }}>
            {/* Title on the left */}
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'blue',
              marginLeft: '10px',
              
            }}>
              AnimalWorld
            </div>
        {/* If the user is not authenticated and not on register or login page */}
        {!isAuthenticated && !hideButtons && (
          <>
            <Link to="/register" style={{ margin: '0 10px' }}>
              <button className="button"><FiUserPlus /> Register</button>
            </Link>
            <Link to="/login" style={{ margin: '0 10px' }}>
              <button className="button"><FiLogIn /> Login</button>
            </Link>
          </>
        )}
        {/* If the user is authenticated */}
        {isAuthenticated && (
          <>
          <button
              onClick={() => navigate('/orders')}
              className="button">
              <FiList /> My Orders
            </button>
          <button
            onClick={() => navigate('/cart')}
            className="button" >
                
            <FiShoppingCart /> Cart
            
          </button>
          
            <button
            onClick={() => navigate('/products')}
            className="button">Products</button>
            <Link to="/profile" style={{ margin: '0 10px' }}>
              <button className="button"><FiUser /> Profile</button>
            </Link>
            <button onClick={handleLogout}  className="button">
              <FiLogOut /> Logout
            </button>
            
          </>
        )}
      </header>
    );
  };
  

export default Header;
