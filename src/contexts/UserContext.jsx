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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      if (!loading) {
        setLoading(true);
      }
      if (error) {
        setError(false);
      }
      const userResponse = await getEmployeeProfile();
      const myPermissionsResponse = await getPermissionsByEmployeeId(userResponse.id);
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
      setData(err);
      setError(true);
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

  const logout = () => {
    setData(null);
    localStorage.removeItem('session');
  };

  const value = useMemo(() => ({
    loading, error, data, isLoggedIn, login, logout,
  }), [data, loading, error]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
