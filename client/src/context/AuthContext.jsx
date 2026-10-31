import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLoginApi, getAdminProfileApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('cynbit_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getAdminProfileApi(token);
        if (response.success && response.data?.admin) {
          setAdmin(response.data.admin);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Token validation failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    const response = await adminLoginApi(email, password);
    if (response.success && response.data?.token) {
      setToken(response.data.token);
      setAdmin(response.data.admin);
      localStorage.setItem('cynbit_admin_token', response.data.token);
      return { success: true };
    }
    return { success: false, message: response.message || 'Login failed' };
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cynbit_admin_token');
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
