import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput,
  TextInput,
} from '../../components';
import permissions from '../../constants/permissions';
import './styles.scss';

import {
  createRole, deleteRole, getRoleById, getRoles,
  updateRole,
} from '../../services/roles';
import getPermissions from '../../services/permissions';
import { getPermissionByRoleId } from '../../services/rolesPermission';
import useToast from '../../hooks/useToast';

function RolesScreen() {
  const toast = useToast();

  const [roleResponse, setRoleResponse] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [roleData, setRoleData] = useState({});

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    getPermissions().then(setPermissionList);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRoles();
      setRoleResponse(response);
      setRoleList(response);
    };
    fetchData();
  }, [isModalCreateOpen, isModalUpdateOpen, isModalDeleteOpen]);

  const handleSearch = (e) => {
    const filteredRoles = roleResponse
      .filter((role) => role.role.toLowerCase().includes(e.target.value.toLowerCase()));
    setRoleList(filteredRoles);
  };

  const handlePermissionsToggle = (key) => {
    const newSelection = selectedPermissions.includes(key)
      ? selectedPermissions.filter((item) => item !== key)
      : [...selectedPermissions, key];
    setSelectedPermissions(newSelection);
  };

  const verifyChecked = (key) => {
    if (typeof selectedPermissions[0] === 'number') {
      return selectedPermissions.includes(key);
    }

    if (typeof selectedPermissions[0] === 'object') {
      return selectedPermissions.some((item) => item.id === key);
    }
  };

  const formatSelectedPermissionsResponse = async (roleId) => {
    const response = await getPermissionByRoleId(roleId);
    const permissionsId = response.map((item) => item.id);
    setSelectedPermissions(permissionsId);
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalSeeOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
    setRoleData({});
    setSelectedPermissions([]);
  };

  const handleRoleData = (e) => {
    setRoleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateRole = async (event) => {
    try {
      event.preventDefault();

      const data = {
        ...roleData,
        permissions: selectedPermissions,
      };

      await createRole(data);
      toast.successToast('Cargo cadastrado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar cargo', error);
      toast.errorToast('Erro ao cadastrar cargo');
    }
  };

  const handleUpdateRole = async (event) => {
    try {
      event.preventDefault();

      const data = {
        ...roleData,
        permissions: selectedPermissions,
      };
      await updateRole(data.id, data);
      toast.successToast('Cargo atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar cargo', error);
      toast.errorToast('Erro ao atualizar cargo');
    }
  };

  const handleDeleteRole = async (event) => {
    try {
      event.preventDefault();
      await deleteRole(roleData.id);
      toast.successToast('Cargo deletado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar cargo', error);
      toast.errorToast('Erro ao deletar cargo');
    }
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
                  checked={verifyChecked(value.id)}
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
    if (!isModalSeeOpen && selectedPermissions.length === 0) return null;
    return (
      <>
        <label htmlFor="role">
          Cargo*:
          <TextInput variant="formField" type="text" name="role" disabled readOnly value={roleData.role} />
        </label>
        <div className="permissionsContainer">
          Permissões:
          <List containerClassName="permissionListContainer">
            {permissionList.map((value) => (
              <label key={value.id} htmlFor={value.permission}>
                <input
                  type="checkbox"
                  name={value.permission}
                  checked={verifyChecked(value.id)}
                  disabled
                  readOnly
                />
                {permissions[value.permission]}
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
            {permissionList.map((value) => (
              <label key={value.id} htmlFor={value.permission}>
                <input
                  type="checkbox"
                  name={value.permission}
                  checked={verifyChecked(value.id)}
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
            text="Alterar"
            onClick={handleUpdateRole}
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

  const openDeleteRoleModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar usuário?</h2>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Deletar"
            onClick={handleDeleteRole}
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
    <div className="rolesLayout">
      <div className="rolesSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
          onClick={() => {
            setIsModalCreateOpen(true);
            setIsModalOpen(true);
          }}
        />
        <SearchInput onChange={handleSearch} />
      </div>
      <List containerClassName="rolesListContainer">
        {roleList.map((item) => (
          <ListItem
            description={item.role}
            key={item.id}
            seeAction={async () => {
              formatSelectedPermissionsResponse(item.id);
              setRoleData(await getRoleById(item.id));
              setIsModalSeeOpen(true);
              setIsModalOpen(true);
            }}
            updateAction={async () => {
              formatSelectedPermissionsResponse(item.id);
              setRoleData(await getRoleById(item.id));
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
