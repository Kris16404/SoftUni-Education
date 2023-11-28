import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = sessionStorage.getItem('authToken');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem('authToken', JSON.stringify(token));
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
