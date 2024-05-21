import { useEffect, useState } from 'react';
import './styles.scss';
import {
  Button,
  List, ListItem, Loading, TextInput,
} from '../../components';

import permissions from '../../constants/permissions';
import { getEmployeeProfile } from '../../services/myProfile';
import { getPermissionsByEmployeeId } from '../../services/employeesPermission';
import { getPermissionByRoleId } from '../../services/rolesPermission';
import useUser from '../../hooks/useUser';

function MyAreaScreen() {
  const user = useUser();
  const [myData, setMyData] = useState({});
  const [myPermissions, setMyPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const fetchData = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      if (loadingError) {
        setLoadingError(false);
      }
      const response = await getEmployeeProfile();
      setMyData(response);

      const myPermissionsResponse = await getPermissionsByEmployeeId(response.id);
      setMyPermissions(myPermissionsResponse);

      const rolePermissionsResponse = response.role?.id
        ? await getPermissionByRoleId(response.role.id)
        : [];
      setRolePermissions(rolePermissionsResponse);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoadingError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('userContext', user);
  }, [user.loading]);

  if (isLoading) {
    return (
      <div className="myAreaScreenLayout">
        <Loading />
        <p>Carregando...</p>
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="usersLayout">
        <h1>Erro ao carregar dados</h1>
        <Button variant="primaryButton" text="Recarregar página" onClick={fetchData} />
      </div>
    );
  }

  return (
    <div className="myAreaScreenLayout">
      <div className="myAreaScreenContent">
        <h1 className="myAreaTitle">{myData.name}</h1>
        <label>
          Cargo:
          <TextInput variant="formField" type="text" disabled value={myData.role?.role || ''} />
        </label>
        <div className="permissionsDiv">
          Permissões:
          <List containerClassName="myPermissionsListContainer">
            {rolePermissions.map((permission) => (
              <ListItem
                key={permission.id}
                description={`${myData.role.role} - ${permissions[permission.permission]}`}
                seeButton={false}
                updateButton={false}
                deleteButton={false}
              />
            ))}
            {myPermissions.map((permission) => (
              <ListItem
                key={permission.id}
                description={`${myData.name} - ${permissions[permission.permission]}`}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default MyAreaScreen;
