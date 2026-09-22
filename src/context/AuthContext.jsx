import { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getLocalStorage('auth_user', null));

  useEffect(() => {
    setLocalStorage('auth_user', user);
  }, [user]);

  const login = (username, password) => {
    // Mock authentication
    if (username === 'admin' && password === 'admin') {
      setUser({ username: 'admin', role: 'Store Manager' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
