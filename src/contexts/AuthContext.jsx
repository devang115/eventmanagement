// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) =>  {
    
  const [user, setUser] = useState(null);
  const signup = async (userData) => {
    try {
      // 1. SIMULATE API REQUEST (REPLACE WITH ACTUAL API CALL)
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Simulate a successful signup
          resolve({
            success: true,
            user: { ...userData, id: Math.random() }, // Adding a dummy ID
          });

          // Example error simulation:
          // resolve({ success: false, message: 'Username already taken!' });
        }, 1000);
      });

      // 2. HANDLE API RESPONSE
      if (response.success) {
        login(response.user); // Log the user in after signup
        return { success: true }; 
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  };


  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Check localStorage on component mount and set user if data exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup  }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };