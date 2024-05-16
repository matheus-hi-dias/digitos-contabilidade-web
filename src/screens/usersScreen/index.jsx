import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput,
  Select,
  TextInput,
} from '../../components';
import './styles.scss';

import {
  createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee,
} from '../../services/employees';
import { getRoles } from '../../services/roles';
import { setEmptyValues } from '../../utils';
import getPermissions from '../../services/permissions';
import { getPermissionsByEmployeeId } from '../../services/employeesPermission';
import permissions from '../../constants/permissions';
import useToast from '../../hooks/useToast';

function UsersScreen() {
  const toast = useToast();

  const [userResponse, setUserResponse] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployees();
      setUserResponse(response);
      setUserList(response);
    };
    fetchData();
  }, [isModalCreateOpen, isModalUpdateOpen, isModalDeleteOpen]);

  useEffect(() => {
    getRoles().then(setRoleList);
    getPermissions().then(setPermissionList);
  }, []);

  const handleSearch = (e) => {
    const filteredUsers = userResponse
      .filter((user) => user.username.toLowerCase().includes(e.target.value.toLowerCase()));
    setUserList(filteredUsers);
  };

  const formatSelectedPermissionsResponse = async (employeeId) => {
    const response = await getPermissionsByEmployeeId(employeeId);
    const permissionsId = response.map((item) => item.id);
    setSelectedPermissions(permissionsId);
  };

  const handleOpenModal = async (modalType, itemId) => {
    switch (modalType) {
      case 'create':
        setIsModalCreateOpen(true);
        setIsModalOpen(true);
        break;
      case 'see':
        await getEmployeeById(itemId).then(setUserData);
        formatSelectedPermissionsResponse(itemId);
        setIsModalSeeOpen(true);
        setIsModalOpen(true);
        break;
      case 'update':
        await getEmployeeById(itemId).then(setUserData);
        formatSelectedPermissionsResponse(itemId);
        setIsModalUpdateOpen(true);
        setIsModalOpen(true);
        break;
      case 'delete':
        await getEmployeeById(itemId).then(setUserData);
        setIsModalDeleteOpen(true);
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalSeeOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
    setUserData({});
    setSelectedPermissions([]);
  };

  const handleUserData = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const handleErrorToast = (error, defaultMessage) => {
    if (error.response.data.message.toLowerCase() === 'email already in use') {
      toast.errorToast('Email já está em uso');
      return;
    }
    if (error.response.data.message.toLowerCase() === 'username already in use') {
      toast.errorToast('Nome de usuário já está em uso');
      return;
    }
    toast.errorToast(defaultMessage);
  };

  const handleCreateEmployee = async (event) => {
    try {
      event.preventDefault();

      const data = {
        ...userData,
        permissions: selectedPermissions,
      };
      await createEmployee(data);
      toast.successToast('Usuário cadastrado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
      handleErrorToast(error, 'Erro ao cadastrar usuário');
    }
  };

  const handleUpdateEmployee = async (event) => {
    try {
      event.preventDefault();

      const data = {
        ...userData,
        role_id: userData.role != null ? userData.role.id : null,
        permissions: selectedPermissions,
      };
      delete data.role;

      await updateEmployee(userData.id, data);
      toast.successToast('Usuário atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
      handleErrorToast(error, 'Erro ao atualizar usuário');
    }
  };

  const handleDeleteEmployee = async (event) => {
    try {
      event.preventDefault();
      await deleteEmployee(userData.id);
      toast.successToast('Usuário deletado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
      handleErrorToast(error, 'Erro ao deletar usuário');
    }
  };

  const openCreateUserModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="email">
          Email*:
          <TextInput variant="formField" type="text" name="email" onChange={handleUserData} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <TextInput variant="formField" type="text" name="username" onChange={handleUserData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" type="text" name="name" onChange={handleUserData} />
        </label>
        <label htmlFor="password">
          Senha*:
          <TextInput variant="formField" type="text" name="password" onChange={handleUserData} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <Select name="role_id" onChange={handleUserData} options={setEmptyValues(roleList)} optionKey="id" optionLabels={['role']} />
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
            onClick={handleCreateEmployee}
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

  const openSeeUserModal = () => {
    if (!isModalSeeOpen) return null;
    return (
      <>
        <label htmlFor="email">
          Email*:
          <TextInput variant="formField" type="text" name="email" disabled readOnly value={userData.email} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <TextInput variant="formField" type="text" name="username" disabled readOnly value={userData.username} />
        </label>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" type="text" name="name" disabled readOnly value={userData.name} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <TextInput variant="formField" type="text" name="role_id" disabled readOnly value={userData.role?.role || ''} />
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

  const openUpdateUserModal = () => {
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="email">
          Email*:
          <TextInput variant="formField" type="text" name="email" defaultValue={userData.email} onChange={handleUserData} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <TextInput variant="formField" type="text" name="username" defaultValue={userData.username} onChange={handleUserData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" type="text" name="name" defaultValue={userData.name} onChange={handleUserData} />
        </label>
        <label htmlFor="password">
          Senha*:
          <TextInput variant="formField" type="text" name="password" onChange={handleUserData} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <Select name="role_id" onChange={handleUserData} options={setEmptyValues(roleList)} optionKey="id" optionLabels={['role']} defaultValue={userData.role?.id} />
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
            onClick={handleUpdateEmployee}
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

  const openDeleteUserModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar usuário?</h2>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Deletar"
            onClick={handleDeleteEmployee}
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
          onClick={() => handleOpenModal('create')}
        />
        <SearchInput onChange={handleSearch} />
      </div>
      <List containerClassName="usersListContainer">
        {userList.map((item) => (
          <ListItem
            description={item.username}
            key={item.id}
            seeAction={() => handleOpenModal('see', item.id)}
            updateAction={() => handleOpenModal('update', item.id)}
            deleteAction={() => handleOpenModal('delete', item.id)}
          />
        ))}
      </List>
      {isModalOpen && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateUserModal()))
        || (isModalSeeOpen && (openSeeUserModal()))
        || (isModalUpdateOpen && (openUpdateUserModal()))
        || (isModalDeleteOpen && (openDeleteUserModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default UsersScreen;
