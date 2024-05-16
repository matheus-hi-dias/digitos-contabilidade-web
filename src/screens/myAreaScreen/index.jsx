import { useEffect, useState } from 'react';
import './styles.scss';
import {
  List, ListItem, Loading, TextInput,
} from '../../components';

import permissions from '../../constants/permissions';
import { getEmployeeProfile } from '../../services/myProfile';
import { getPermissionsByEmployeeId } from '../../services/employeesPermission';
import { getPermissionByRoleId } from '../../services/rolesPermission';

function MyAreaScreen() {
  const [myData, setMyData] = useState({});
  const [myPermissions, setMyPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployeeProfile();
      setMyData(response);

      const myPermissionsResponse = await getPermissionsByEmployeeId(response.id);
      setMyPermissions(myPermissionsResponse);

      const rolePermissionsResponse = response.role?.id
        ? await getPermissionByRoleId(response.role.id)
        : [];
      setRolePermissions(rolePermissionsResponse);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="myAreaScreenLayout">
        <Loading />
        <p>Carregando...</p>
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
