import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, TextInput,
} from '../../components';
import permissions from '../../constants/permissions';
import './styles.scss';

import { roleList } from '../../constants/mocks';

function RolesScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [roleData, setRoleData] = useState({
    role: '',
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionsToggle = (key) => {
    const newSelection = selectedPermissions.includes(key)
      ? selectedPermissions.filter((item) => item !== key)
      : [...selectedPermissions, key];
    setSelectedPermissions(newSelection);
  };

  useEffect(() => { console.log({ selectedPermissions }); }, [selectedPermissions]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleData({
      role: '',
    });
  };

  const handleRoleData = (e) => {
    setRoleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateRoleModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="role">
          Cargo*:
          <input type="text" name="role" onChange={handleRoleData} />
        </label>
        <div className="permissionsContainer">
          Permissões:
          <List containerClassName="permissionListContainer">
            {Object.keys(permissions).map((key) => (
              <label key={key} htmlFor={permissions[key]}>
                <input
                  type="checkbox"
                  name={key}
                  checked={selectedPermissions.includes(key)}
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
            text="Cadastrar"
            onClick={handleCloseModal}
          />
          <Button
            variant="primaryButton"
            text="Cancelar"
            onClick={handleCloseModal}
          />
        </div>
      </>,
    );
  };

  const openSeeRoleModal = (id) => {
    const selectedRoleData = roleList.find((item) => item.id === id);
    setRoleData(selectedRoleData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="role">
          Cargo*:
          <input type="text" name="role" disabled readOnly value={selectedRoleData.role} />
        </label>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Sair"
            onClick={handleCloseModal}
          />
        </div>
      </>,
    );
  };

  const openUpdateRoleModal = (id) => {
    const selectedRoleData = roleList.find((item) => item.id === id);
    setRoleData(selectedRoleData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="role">
          Cargo*:
          <input type="text" name="role" defaultValue={selectedRoleData.role} onChange={handleRoleData} />
        </label>
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
      </>,
    );
  };

  useEffect(() => {}, [roleData]);

  const openDeleteRoleModal = () => {
    handleOpenModal();
    setModalChildren(
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
      </>,
    );
  };

  return (
    <div className="usersLayout">
      <div className="usersSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" onClick={openCreateRoleModal} />
        <TextInput />
      </div>
      <List containerClassName="usersListContainer">
        {roleList.map((item) => (
          <ListItem
            description={item.role}
            key={item.id}
            seeAction={() => openSeeRoleModal(item.id)}
            updateAction={() => openUpdateRoleModal(item.id)}
            deleteAction={() => openDeleteRoleModal(item.id)}
          />
        ))}
      </List>
      {isModalOpen && <Modal onClose={handleCloseModal}>{modalChildren}</Modal>}
    </div>
  );
}

export default RolesScreen;
