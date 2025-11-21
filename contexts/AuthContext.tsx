import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../constants';
import { User } from '../types';
import { useToast } from '../components/ui/Toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    // Check for existing session on load
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    // Simulate login API call
    // Explicitly map properties to match User interface
    const mockUser: User = {
        id: 'user_123',
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        imageUrl: MOCK_USER.avatarUrl, // Ensure this maps correctly from constant
        creditsLeft: 10,
        isPro: false
    };
    
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    addToast(`Bem-vindo, ${mockUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    addToast('Desconectado com sucesso.', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};