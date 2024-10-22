import { useEffect, useState } from 'react';
import useErrors from '../../hooks/useErrors';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput,
  TextInput,
} from '../../components';
import './styles.scss';

import {
  createNature, deleteNature, getNatureById, getNatures, updateNature,
} from '../../services/documentsNature';
import useToast from '../../hooks/useToast';
import LoadingScreen from '../LoadingScreen';

function DocumentsNatureScreen() {
  const toast = useToast();

  const [documentNatureResponse, setDocumentNatureResponse] = useState([]);
  const [documentNatureList, setDocumentNatureList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [natureData, setNatureData] = useState({
    nature: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const {
    setErrors,
  } = useErrors();

  const fetchData = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      if (loadingError) {
        setLoadingError(false);
      }
      const response = await getNatures();
      setDocumentNatureResponse(response);
      setDocumentNatureList(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const handleSearch = (e) => {
    const filteredNatures = documentNatureResponse
      .filter((nature) => nature.nature.toLowerCase().includes(e.target.value.toLowerCase()));
    setDocumentNatureList(filteredNatures);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
    setNatureData({
      nature: '',
    });
  };

  const handleNatureData = (event) => {
    setNatureData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === 'nature' && !event.target.value) {
      setErrors({ field: event.target.name, error: 'Natureza é um campo obrigatório' });
    }
  };

  const handleErrorToast = (error, defaultMessage) => {
    if (error.response.data.message.toLowerCase() === 'nature already exists') {
      return toast.errorToast('Natureza já cadastrada');
    }
    toast.errorToast(defaultMessage);
  };

  const handleCreateNature = async (event) => {
    try {
      event.preventDefault();
      await createNature(natureData);
      toast.successToast('Natureza cadastrada com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar natureza', error);
      handleErrorToast(error, 'Erro ao cadastrar natureza');
    }
  };

  const handleUpdateNature = async (event) => {
    try {
      event.preventDefault();
      await updateNature(natureData.id, natureData);
      toast.successToast('Natureza atualizada com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar natureza', error);
      handleErrorToast(error, 'Erro ao atualizar natureza');
    }
  };

  const handleDeleteNature = async (event) => {
    try {
      event.preventDefault();
      await deleteNature(natureData.id);
      toast.successToast('Natureza deletada com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar natureza', error);
      handleErrorToast(error, 'Erro ao deletar natureza');
    }
  };

  const openCreateNatureModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="nature">
          Natureza do documento*:
          <TextInput variant="formField" type="text" name="nature" onChange={handleNatureData} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCreateNature} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openUpdateNatureModal = () => {
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="nature">
          Natureza do documento*:
          <TextInput variant="formField" type="text" name="nature" defaultValue={natureData.nature} onChange={handleNatureData} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Alterar" onClick={handleUpdateNature} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  useEffect(() => { }, [natureData]);

  const openDeleteNatureModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar natureza?</h2>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Deletar" onClick={handleDeleteNature} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (loadingError) {
    return (
      <div className="documentNatureLayout">
        <h1>Erro ao carregar dados</h1>
        <Button variant="primaryButton" text="Recarregar página" onClick={fetchData} />
      </div>
    );
  }

  return (
    <div className="documentNatureLayout">
      <div className="documentNatureSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
          onClick={() => {
            setIsModalCreateOpen(true);
            handleOpenModal();
          }}
        />
        <SearchInput onChange={handleSearch} />
      </div>
      <List containerClassName="documentNatureListContainer">
        {documentNatureList.map((item) => (
          <ListItem
            description={item.nature}
            key={item.id}
            seeButton={false}
            updateAction={async () => {
              setNatureData(await getNatureById(item.id));
              setIsModalUpdateOpen(true);
              handleOpenModal();
            }}
            deleteAction={async () => {
              setNatureData(await getNatureById(item.id));
              setIsModalDeleteOpen(true);
              handleOpenModal();
            }}
          />
        ))}
      </List>

      {isModalOpen
      && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateNatureModal()))
        || (isModalUpdateOpen && (openUpdateNatureModal()))
        || (isModalDeleteOpen && (openDeleteNatureModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default DocumentsNatureScreen;
