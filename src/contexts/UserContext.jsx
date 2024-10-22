// UserContext.js
import React, {
  createContext, useState, useEffect,
  useMemo,
} from 'react';
import { getEmployeeProfile } from '../services/myProfile';
import { getPermissionsByEmployeeId } from '../services/employeesPermission';
import { getPermissionByRoleId } from '../services/rolesPermission';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    setData(null);
    localStorage.removeItem('session');
    setIsLoggedIn(false);
  };

  const fetchUserData = async () => {
    try {
      if (!loading) {
        setLoading(true);
      }
      if (error) {
        setError(false);
      }
      const userResponse = await getEmployeeProfile();
      if (userResponse.name === 'TokenExpiredError') {
        throw new Error('TokenExpiredError');
      }
      const myPermissionsResponse = userResponse.id
        ? await getPermissionsByEmployeeId(userResponse.id)
        : [];
      const rolePermissionsResponse = userResponse.role?.id
        ? await getPermissionByRoleId(userResponse.role.id)
        : [];

      setData({
        ...userResponse,
        rolePermissions: rolePermissionsResponse.map((perm) => perm.permission),
        permissions: myPermissionsResponse.map((perm) => perm.permission),
      });
    } catch (err) {
      console.error('error', err);
      // Verifica se o erro é devido ao token expirado
      if (err.message === 'TokenExpiredError') {
        console.log('Token expired, logging out...');
        logout();
      } else {
        setData(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('session'));
    if (storedToken && data === null) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  const login = (userToken) => {
    localStorage.setItem('session', JSON.stringify(userToken));
    setIsLoggedIn(true);
    fetchUserData();
  };

  const value = useMemo(() => ({
    loading, error, data, isLoggedIn, login, logout, fetchUserData,
  }), [data, loading, error, isLoggedIn]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
