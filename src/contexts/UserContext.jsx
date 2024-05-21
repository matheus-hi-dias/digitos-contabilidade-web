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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

      setUser({
        ...userResponse,
        rolePermissions: rolePermissionsResponse,
        permissions: myPermissionsResponse,
      });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('session'));
    if (storedToken) {
      fetchUserData();
    }
  }, []);

  const login = (userToken) => {
    localStorage.setItem('session', JSON.stringify(userToken));
    fetchUserData();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  const value = useMemo(() => ({
    loading, error, user, login, logout,
  }), [user, loading, error]);
  console.log({ value });
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// export const useUser = () => useContext(UserContext);
