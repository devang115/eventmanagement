import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } 
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } 

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Simulate an API call for user authentication
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Check if the username and password match your criteria (replace with actual authentication)
          if (formData.username === 'user' && formData.password === 'password') {
            resolve({ success: true, user: { name: formData.username, id: 1 } });
          } else {
            resolve({ success: false, message: 'Invalid credentials' }); 
          }
        }, 1000); 
      });

      if (response.success) {
        login(response.user);
        navigate('/'); 
        setErrors({});
      } else {
        setErrors({ loginError: response.message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ loginError: 'An error occurred during login.' }); 
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center h-screen"> 
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {errors.loginError && ( 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errors.loginError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username" // Add name attribute
              value={formData.username}
              onChange={handleChange}
              className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password" 
              id="password"
              name="password" // Add name attribute
              value={formData.password}
              onChange={handleChange}
              className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : ''
              }`} 
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Dont have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link> 
        </p>
      </div>
    </div>
  );
};

export default Login;