import { useEffect, useState } from 'react';
import {
  AddIcon,
  Button,
  List,
  ListItem,
  Loading,
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
import useToast from '../../hooks/useToast';

function ClientsScreen() {
  const toast = useToast();

  const [clientsResponse, setClientsResponse] = useState([]);
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getClients();
      setClientsResponse(response);
      setClientsList(response);
      setIsLoading(false);
    };
    fetchData();
  }, [isModalCreateOpen, isModalUpdateOpen, isModalDeleteOpen]);

  const handleSearch = (e) => {
    const filteredClients = clientsResponse
      .filter((client) => client.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setClientsList(filteredClients);
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

  const handleErrorToast = (error, defaultMessage) => {
    if (error.response.data.message === 'cpfCnpj already in use' && clientData.personType === 'F') {
      toast.errorToast('CPF já cadastrado');
      return;
    }
    if (error.response.data.message === 'cpfCnpj already in use' && clientData.personType === 'J') {
      toast.errorToast('CNPJ já cadastrado');
      return;
    }
    toast.errorToast(defaultMessage);
  };

  const handleUpdateClient = async (event) => {
    try {
      event.preventDefault();
      const updatedClient = { ...clientData };
      delete updatedClient.id;
      await updateClient(clientData.id, updatedClient);
      toast.successToast('Cliente atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar cliente', error);
      handleErrorToast(error, 'Erro ao atualizar cliente');
    }
  };

  const handleCreateClient = async (event) => {
    try {
      event.preventDefault();
      await createClient(clientData);
      toast.successToast('Cliente cadastrado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar cliente', error);
      handleErrorToast(error, 'Erro ao cadastrar cliente');
    }
  };

  const handleDeleteClient = async (event) => {
    try {
      event.preventDefault();
      await deleteClient(clientData.id);
      toast.successToast('Cliente deletado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar cliente', error);
      handleErrorToast(error, 'Erro ao deletar cliente');
    }
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

  if (isLoading) {
    return (
      <div className="clientsLayout">
        <Loading />
        <p>Carregando...</p>
      </div>
    );
  }

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
        <SearchInput onChange={handleSearch} />
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
