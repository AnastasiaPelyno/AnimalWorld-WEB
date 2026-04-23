// 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
const Profile = ({ onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '', 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://animalworld-web-1.onrender.com/api/users/profile/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('access')}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        setError('Failed to load data profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put('https://animalworld-web-1.onrender.com/api/users/profile/', formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('access')}`,
        },
      });

      onUpdateProfile(response.data); 
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Failed to update profile.Try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="input-field">
        <FaUser />
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="input-field">
        <FaUser />
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="input-field">
        <FaPhone />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number || ''}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
        <div className="input-field">
        <FaEnvelope />
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Email"
            disabled
          />
        </div>
        <div className="input-field">
        <FaLock />
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="New Password"
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <button onClick={() => navigate('/')} className="button go-to-main">
        Go to Main Page
      </button>
    </div>
  );
};

export default Profile;
