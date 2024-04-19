import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, TextInput,
} from '../../components';
import personTypeList from '../../constants/personTypeList';
import './styles.scss';

function ClientsScreen() {
  const clientsList = [
    {
      id: 1, name: 'Joaozinho', personType: 'F', cpfCnpj: '01234567890',
    },
    {
      id: 2, name: 'Empresa Ltda', personType: 'J', cpfCnpj: '01234567890',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [clientData, setClientData] = useState({
    name: '',
    personType: '',
    cpfCnpj: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClientData({
      name: '',
      personType: '',
      cpfCnpj: '',
    });
  };

  const handleClientData = (e) => {
    setClientData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateClientModal = () => {
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" onChange={handleClientData} />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <select type="text" name="personType" onChange={handleClientData}>
            {personTypeList.map((item) => (
              <option key={item.id} value={item.id}>{item.value}</option>
            ))}
          </select>
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <input type="text" name="cpfCnpj" onChange={handleClientData} />
        </label>
        <div className="clientButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </div>,
    );
  };

  const openSeeClientModal = (id) => {
    const selectedClientData = clientsList.find((item) => item.id === id);
    setClientData(selectedClientData);
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="name">
          Nome:
          <input type="text" name="name" readOnly value={selectedClientData.name} />
        </label>

        <label htmlFor="personType">
          Tipo:
          <input type="text" name="personType" disabled value={selectedClientData.personType} />
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ:
          <input type="text" name="cpfCnpj" disabled value={selectedClientData.cpfCnpj} />
        </label>
        <div className="clientButtonsContainer">
          <Button variant="primaryButton" text="Sair" onClick={handleCloseModal} />
        </div>
      </div>,
    );
  };

  const openUpdateClientModal = (id) => {
    const selectedClientData = clientsList.find((item) => item.id === id);
    setClientData(selectedClientData);
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" defaultValue={selectedClientData.name} onChange={handleClientData} />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <select type="text" name="personType" defaultValue={selectedClientData.personType} onChange={handleClientData}>
            {personTypeList.map((item) => (
              <option key={item.id} value={item.id}>{item.value}</option>
            ))}
          </select>
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <input type="text" name="cpfCnpj" defaultValue={selectedClientData.cpfCnpj} onChange={handleClientData} />
        </label>
        <div className="clientButtonsContainer">
          <Button variant="primaryButton" text="Alterar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </div>,
    );
  };

  useEffect(() => { console.log(clientData); }, [clientData]);

  const openDeleteClientModal = () => {
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <div className="clientButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </div>,
    );
  };

  return (
    <div className="clientsLayout">
      <div className="clientsSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" onClick={openCreateClientModal} />
        <TextInput />
      </div>
      <List containerClassName="clientsListContainer">
        {clientsList.map((item) => (
          <ListItem
            description={item.name}
            key={item.id}
            seeAction={() => openSeeClientModal(item.id)}
            updateAction={() => openUpdateClientModal(item.id)}
            deleteAction={openDeleteClientModal}
          />
        ))}
      </List>
      {isModalOpen
      && (
      <Modal onClose={handleCloseModal}>
        {modalChildren}
      </Modal>
      )}
    </div>
  );
}

export default ClientsScreen;
