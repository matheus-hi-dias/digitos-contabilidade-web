import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, TextInput,
} from '../../components';
import './styles.scss';

import { userList, roleList } from '../../constants/mocks';

function UsersScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    name: '',
    role_id: undefined,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserData({
      email: '',
      username: '',
      name: '',
      role_id: undefined,
    });
  };

  const handleUserData = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateUserModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="email">
          Email*:
          <input type="text" name="email" onChange={handleUserData} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <input type="text" name="username" onChange={handleUserData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" onChange={handleUserData} />
        </label>
        <label htmlFor="password">
          Senha*:
          <input type="text" name="password" onChange={handleUserData} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <select type="text" name="role_id" onChange={handleUserData}>
            {roleList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.role}
              </option>
            ))}
          </select>
        </label>
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

  const openSeeUserModal = (id) => {
    const selectedUserData = userList.find((item) => item.id === id);
    setUserData(selectedUserData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="email">
          Email*:
          <input type="text" name="email" disabled readOnly value={selectedUserData.email} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <input type="text" name="username" disabled readOnly value={selectedUserData.username} />
        </label>
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" disabled readOnly value={selectedUserData.name} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <input type="text" name="role_id" disabled readOnly value={selectedUserData.role_id} />
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

  const openUpdateUserModal = (id) => {
    const selectedUserData = userList.find((item) => item.id === id);
    setUserData(selectedUserData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="email">
          Email*:
          <input type="text" name="email" defaultValue={selectedUserData.email} onChange={handleUserData} />
        </label>
        <label htmlFor="username">
          Nome de usuário*:
          <input type="text" name="username" defaultValue={selectedUserData.username} onChange={handleUserData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" defaultValue={selectedUserData.name} onChange={handleUserData} />
        </label>
        <label htmlFor="password">
          Senha*:
          <input type="text" name="password" onChange={handleUserData} />
        </label>
        <label htmlFor="role_id">
          Cargo*:
          <select type="text" name="role_id" defaultValue={selectedUserData.role_id} onChange={handleUserData}>
            {roleList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.role}
              </option>
            ))}
          </select>
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

  useEffect(() => {}, [userData]);

  const openDeleteUserModal = () => {
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
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" onClick={openCreateUserModal} />
        <TextInput />
      </div>
      <List containerClassName="usersListContainer">
        {userList.map((item) => (
          <ListItem
            description={item.username}
            key={item.id}
            seeAction={() => openSeeUserModal(item.id)}
            updateAction={() => openUpdateUserModal(item.id)}
            deleteAction={() => openDeleteUserModal(item.id)}
          />
        ))}
      </List>
      {isModalOpen && <Modal onClose={handleCloseModal}>{modalChildren}</Modal>}
    </div>
  );
}

export default UsersScreen;
