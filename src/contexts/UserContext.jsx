// UserContext.js
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('session'));
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);

  const login = (userToken) => {
    setUser(userToken);
    localStorage.setItem('session', JSON.stringify(userToken));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
