import './styles.scss';
import {
  Button,
  List, ListItem, Loading, TextInput,
} from '../../components';
import permissions from '../../constants/permissions';
import useUser from '../../hooks/useUser';

function MyAreaScreen() {
  const {
    data: userData, loading, error, fetchUserData,
  } = useUser();

  if (loading) {
    return (
      <div className="myAreaScreenLayout">
        <Loading />
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="usersLayout">
        <h1>Erro ao carregar dados</h1>
        <Button variant="primaryButton" text="Recarregar página" onClick={fetchUserData} />
      </div>
    );
  }

  const {
    name, role, rolePermissions, permissions: myPermissions,
  } = userData;

  return (
    <div className="myAreaScreenLayout">
      <div className="myAreaScreenContent">
        <h1 className="myAreaTitle">{name}</h1>
        <label>
          Cargo:
          <TextInput variant="formField" type="text" disabled value={role?.role || ''} />
        </label>
        <div className="permissionsDiv">
          Permissões:
          <List containerClassName="myPermissionsListContainer">
            {rolePermissions.length > 0 && rolePermissions.map((permission) => (
              <ListItem
                key={permission}
                description={`${role.role} - ${permissions[permission]}`}
                seeButton={false}
                updateButton={false}
                deleteButton={false}
              />
            ))}
            {myPermissions.length > 0 && myPermissions.map((permission) => (
              <ListItem
                key={permission}
                description={`${name} - ${permissions[permission]}`}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default MyAreaScreen;
