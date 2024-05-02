import { useEffect, useState } from 'react';
import {
  AddIcon,
  Button,
  List,
  ListItem,
  Modal,
  SearchInput,
  Select,
  TextInput,
} from '../../components';
import personTypeList from '../../constants/personTypeList';
import './styles.scss';
import {
  createClient, deleteClient, getClientById, getClients, updateClient,
} from '../../services/clientsService';

function ClientsScreen() {
  const [clientsList, setClientsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name: '',
    personType: '',
    cpfCnpj: '',
  });

  useEffect(() => {
    getClients().then((resp) => setClientsList(resp));
  }, [isModalCreateOpen, isModalUpdateOpen, isModalDeleteOpen]);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalSeeOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
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

  const handleUpdateClient = async (event) => {
    event.preventDefault();
    const updatedClient = { ...clientData };
    delete updatedClient.id;
    await updateClient(clientData.id, updatedClient);
    handleCloseModal();
  };

  const handleCreateClient = async (event) => {
    event.preventDefault();
    await createClient(clientData);
    handleCloseModal();
  };

  const handleDeleteClient = async (event) => {
    event.preventDefault();
    await deleteClient(clientData.id);
    handleCloseModal();
  };

  const openCreateClientModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" name="name" onChange={handleClientData} />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <Select name="personType" onChange={handleClientData} options={personTypeList} optionKey="id" optionLabels={['value']} />
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <TextInput variant="formField" name="cpfCnpj" onChange={handleClientData} />
        </label>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Cadastrar"
            onClick={handleCreateClient}
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

  const openSeeClientModal = () => {
    if (!clientData) return null;
    return (
      <>
        <label htmlFor="name">
          Nome:
          <TextInput
            variant="formField"
            type="text"
            name="name"
            readOnly
            value={clientData.name}
          />
        </label>

        <label htmlFor="personType">
          Tipo:
          <TextInput
            variant="formField"
            type="text"
            name="personType"
            disabled
            value={clientData.personType}
          />
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ:
          <TextInput
            variant="formField"
            type="text"
            name="cpfCnpj"
            disabled
            value={clientData.cpfCnpj}
          />
        </label>
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

  const openUpdateClientModal = () => {
    if (!clientData) return null;
    return (
      <>
        <label htmlFor="name">
          Nome*:
          <TextInput
            variant="formField"
            type="text"
            name="name"
            defaultValue={clientData.name}
            onChange={handleClientData}
          />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <Select name="personType" onChange={handleClientData} options={personTypeList} optionKey="id" optionLabels={['value']} defaultValue={clientData.personType} />
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <TextInput
            variant="formField"
            type="text"
            name="cpfCnpj"
            defaultValue={clientData.cpfCnpj}
            onChange={handleClientData}
          />
        </label>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Alterar"
            type="button"
            onClick={handleUpdateClient}
          />
          <Button
            variant="primaryButton"
            text="Cancelar"
            type="button"
            onClick={handleCloseModal}
          />
        </div>
      </>
    );
  };

  const openDeleteClientModal = () => {
    if (!clientData) return null;
    return (
      <>
        <h2>Deletar cliente?</h2>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Deletar"
            onClick={handleDeleteClient}
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
    <div className="clientsLayout">
      <div className="clientsSearchAddContainer">
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
      <List containerClassName="clientsListContainer">
        {clientsList.map((item) => (
          <ListItem
            description={item.name}
            key={item.id}
            seeAction={async () => {
              setClientData(await getClientById(item.id));
              setIsModalSeeOpen(true);
              setIsModalOpen(true);
            }}
            updateAction={async () => {
              setClientData(await getClientById(item.id));
              setIsModalUpdateOpen(true);
              setIsModalOpen(true);
            }}
            deleteAction={async () => {
              setClientData(await getClientById(item.id));
              setIsModalDeleteOpen(true);
              setIsModalOpen(true);
            }}
          />
        ))}
      </List>
      {isModalOpen && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateClientModal()))
        || (isModalSeeOpen && (openSeeClientModal()))
        || (isModalUpdateOpen && (openUpdateClientModal()))
        || (isModalDeleteOpen && (openDeleteClientModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default ClientsScreen;
