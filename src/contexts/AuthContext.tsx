'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthUser } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@kurdbook.com',
    password: 'admin123',
    firstName: 'کاروان',
    lastName: 'احمد',
    phone: '+964 750 123 4567',
    avatar: '/images/avatar-placeholder.jpg',
    address: {
      street: 'شەقامی سەلاحەدین',
      city: 'هەولێر',
      state: 'کوردستان',
      zipCode: '44001',
      country: 'عێراق'
    },
    preferences: {
      language: 'ku',
      notifications: true
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-19')
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('kurd-book-user');
        const authToken = localStorage.getItem('kurd-book-token');
        
        if (storedUser && authToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('kurd-book-user');
        localStorage.removeItem('kurd-book-token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return false;
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user and token
      localStorage.setItem('kurd-book-user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('kurd-book-token', 'mock-jwt-token-' + foundUser.id);
      
      setUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        preferences: {
          language: 'ku',
          notifications: true
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to mock users (in real app, this would be API call)
      mockUsers.push({ ...newUser, password: userData.password });
      
      // Store user and token
      localStorage.setItem('kurd-book-user', JSON.stringify(newUser));
      localStorage.setItem('kurd-book-token', 'mock-jwt-token-' + newUser.id);
      
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('kurd-book-user');
    localStorage.removeItem('kurd-book-token');
    setUser(null);
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date()
      };
      
      localStorage.setItem('kurd-book-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        register, 
        logout, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}