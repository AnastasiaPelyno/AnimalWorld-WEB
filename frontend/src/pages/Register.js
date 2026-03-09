// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     last_name: '',
//     first_name: '',
//     phone_number: '',
//     email: '',
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/users/register/', formData);
//       setSuccessMessage("Registration successful!");
//       setTimeout(() => {
//         navigate('/');
//       }, 1500); // Перенаправляє на головну через 1.5 сек
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.email) {
//         setErrorMessage("This email is already taken.");
//       } else {
//         setErrorMessage("Registration failed. Please try again.");
//       }
//       setTimeout(() => setErrorMessage(''), 3000); // Прибирає повідомлення через 3 сек
//     }
//   };

//   return (
//     <div className="register-container">
//       {errorMessage && <div className="popup-message error">{errorMessage}</div>}
//       {successMessage && <div className="popup-message success">{successMessage}</div>}
//       <div className="register-form">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <FaUser />
//             <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
//           </div>
//           <div className="input-field">
//             <FaUser />
//             <input name="first_name" placeholder="First Name" onChange={handleChange} required />
//           </div>
//           <div className="input-field">
//             <FaPhone />
//             <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
//           </div>
//           <div className="input-field">
//             <FaEnvelope />
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//           </div>
//           <div className="input-field">
//             <FaLock />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//         <p className="login-link">
//           Have an account? <Link to="/login">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', formData);

      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem('access', token);
        setIsAuthenticated(true);  // Set authenticated state here

        setSuccessMessage("Registration successful!");
        
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after success
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setErrorMessage("This email is already taken.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="register-container">
      {errorMessage && <div className="popup-message error">{errorMessage}</div>}
      {successMessage && <div className="popup-message success">{successMessage}</div>}
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <FaUser />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <FaUser />
            <input name="first_name" placeholder="First Name" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <FaPhone />
            <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <FaEnvelope />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <FaLock />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
