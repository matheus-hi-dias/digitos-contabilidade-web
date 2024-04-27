import { useEffect, useRef, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput,
  TextInput,
} from '../../components';
import permissions from '../../constants/permissions';
import './styles.scss';

import { createRole, getRoleById, getRoles } from '../../services/roles';
import getPermissions from '../../services/permissions';
import { createRolePermission } from '../../services/rolesPermission';

function RolesScreen() {
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [roleData, setRoleData] = useState({
  });

  const selectedPermissionsRef = useRef([]);

  useEffect(() => {
    getPermissions().then(setPermissionList);
  }, []);

  useEffect(() => {
    getRoles().then(setRoleList);
  }, [isModalCreateOpen, isModalUpdateOpen, isModalDeleteOpen]);
  const handlePermissionsToggle = (key) => {
    const newSelection = selectedPermissionsRef.current.includes(key)
      ? selectedPermissionsRef.current.filter((item) => item !== key)
      : [...selectedPermissionsRef.current, key];
    selectedPermissionsRef.current = newSelection;
    console.log(selectedPermissionsRef);
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleData({
    });
    selectedPermissionsRef.current = [];
  };

  const handleRoleData = (e) => {
    setRoleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateRole = async (event) => {
    event.preventDefault();

    const data = {
      role: roleData.role,
    };
    const newRole = await createRole(data);

    if (selectedPermissionsRef.current.length > 0) {
      selectedPermissionsRef.current.forEach(async (item) => {
        const result = await createRolePermission({
          permission_id: item,
          role_id: newRole.id,
        });
        console.log({ result });
      });
    }

    handleCloseModal();
  };

  const openCreateRoleModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="role">
          Cargo*:
          <TextInput variant="formField" type="text" name="role" onChange={handleRoleData} />
        </label>
        <div className="permissionsContainer">
          Permissões:
          <List containerClassName="permissionListContainer">
            {permissionList.map((value) => (
              <label key={value.id} htmlFor={value.permission}>
                <input
                  type="checkbox"
                  name={value.permission}
                  onChange={() => handlePermissionsToggle(value.id)}
                />
                {permissions[value.permission]}
              </label>
            ))}
          </List>
        </div>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Cadastrar"
            onClick={handleCreateRole}
          />
          <Button
            variant="primaryButton"
            text="Cancelar"
            onClick={handleCloseModal}
          />
        </div>
      </>
    );
  };

  const openSeeRoleModal = () => {
    if (!isModalSeeOpen) return null;
    return (
      <>
        <label htmlFor="role">
          Cargo*:
          <TextInput variant="formField" type="text" name="role" disabled readOnly value={roleData.role} />
        </label>
        <div className="permissionsContainer">
          Permissões:
          <List containerClassName="permissionListContainer">
            {Object.keys(permissions).map((key) => (
              <label key={key} htmlFor={permissions[key]}>
                <input
                  type="checkbox"
                  name={key}
                  onChange={() => handlePermissionsToggle(key)}
                />
                {permissions[key]}
              </label>
            ))}
          </List>
        </div>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Sair"
            onClick={handleCloseModal}
          />
        </div>
      </>
    );
  };

  const openUpdateRoleModal = () => {
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="role">
          Cargo*:
          <TextInput variant="formField" type="text" name="role" defaultValue={roleData.role} onChange={handleRoleData} />
        </label>
        <div className="permissionsContainer">
          Permissões:
          <List containerClassName="permissionListContainer">
            {Object.keys(permissions).map((value) => (
              <label key={value} htmlFor={permissions[value]}>
                <input
                  type="checkbox"
                  name={value}
                  onChange={() => handlePermissionsToggle(value)}
                />
                {permissions[value]}
              </label>
            ))}
          </List>
        </div>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Alterar"
            onClick={handleCloseModal}
          />
          <Button
            variant="primaryButton"
            text="Cancelar"
            onClick={handleCloseModal}
          />
        </div>
      </>
    );
  };

  useEffect(() => {}, [roleData]);

  const openDeleteRoleModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar usuário?</h2>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Deletar"
            onClick={handleCloseModal}
          />
          <Button
            variant="primaryButton"
            text="Cancelar"
            onClick={handleCloseModal}
          />
        </div>
      </>
    );
  };

  return (
    <div className="usersLayout">
      <div className="usersSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
          onClick={() => {
            setIsModalCreateOpen(true);
            setIsModalOpen(true);
          }}
        />
        <SearchInput />
      </div>
      <List containerClassName="usersListContainer">
        {roleList.map((item) => (
          <ListItem
            description={item.role}
            key={item.id}
            seeAction={async () => {
              setRoleData(await getRoleById(item.id));
              setIsModalSeeOpen(true);
              setIsModalOpen(true);
            }}
            updateAction={async () => {
              setRoleData(await getRoleById(item.id));
              setIsModalUpdateOpen(true);
              setIsModalOpen(true);
            }}
            deleteAction={async () => {
              setRoleData(await getRoleById(item.id));
              setIsModalDeleteOpen(true);
              setIsModalOpen(true);
            }}
          />
        ))}
      </List>
      {isModalOpen && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateRoleModal()))
        || (isModalSeeOpen && (openSeeRoleModal()))
        || (isModalUpdateOpen && (openUpdateRoleModal()))
        || (isModalDeleteOpen && (openDeleteRoleModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default RolesScreen;
