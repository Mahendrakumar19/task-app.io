'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      const { user, accessToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      toast.success('Registration successful!');
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      const { user, accessToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      toast.success('Login successful!');
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
