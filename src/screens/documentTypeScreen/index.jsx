import { useEffect, useState } from 'react';

import {
  AddIcon,
  Button,
  List,
  ListItem,
  Modal,
  SearchInput,
  TextInput,
} from '../../components';
import './styles.scss';
import {
  createDocumentType, deleteDocumentType, getDocumentTypeById, getDocumentTypes, updateDocumentType,
} from '../../services/documentsType';
import useToast from '../../hooks/useToast';

function DocumentTypeScreen() {
  const toast = useToast();

  const [documentTypeResponse, setDocumentTypeResponse] = useState([]);
  const [documentTypeList, setDocumentTypeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [documentTypeData, setDocumentTypeData] = useState({
  });

  useEffect(() => {
    if (!isModalOpen) {
      const fetchData = async () => {
        const response = await getDocumentTypes();
        setDocumentTypeResponse(response);
        setDocumentTypeList(response);
      };
      fetchData();
    }
  }, [isModalCreateOpen, isModalDeleteOpen, isModalUpdateOpen]);

  const handleSearch = (e) => {
    const filteredDocTypes = documentTypeResponse
      .filter((docType) => docType.doc_type.toLowerCase().includes(e.target.value.toLowerCase()));
    setDocumentTypeList(filteredDocTypes);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalSeeOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
    setDocumentTypeData({

    });
  };

  const handleDocumentTypeData = (e) => {
    setDocumentTypeData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleErrorToast = (error, defaultMessage) => {
    if (error.response.data.message.toLowerCase() === 'document type already exists') {
      toast.errorToast('Tipo de documento já cadastrado');
      return;
    }
    if (error.response.data.message.toLowerCase() === 'type not found') {
      toast.errorToast('Tipo de documento não encontrado');
      return;
    }
    toast.errorToast(defaultMessage);
  };

  const handleCreateAction = async (event) => {
    try {
      event.preventDefault();
      await createDocumentType(documentTypeData);
      toast.successToast('Tipo de documento cadastrado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar tipo de documento', error);
      handleErrorToast(error, 'Erro ao cadastrar tipo de documento');
    }
  };

  const handleUpdateAction = async (event) => {
    try {
      event.preventDefault();
      await updateDocumentType(documentTypeData.id, documentTypeData);
      toast.successToast('Tipo de documento atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar tipo de documento', error);
      handleErrorToast(error, 'Erro ao atualizar tipo de documento');
    }
  };

  const handleDeleteAction = async (event) => {
    try {
      event.preventDefault();
      await deleteDocumentType(documentTypeData.id);
      toast.successToast('Tipo de documento deletado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar tipo de documento', error);
      handleErrorToast(error, 'Erro ao deletar tipo de documento');
    }
  };

  const openCreateDocumentTypeModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <TextInput variant="formField" type="text" name="doc_type" onChange={handleDocumentTypeData} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <TextInput variant="formField" type="text" name="archiving_time" onChange={handleDocumentTypeData} />
        </label>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Cadastrar"
            onClick={handleCreateAction}
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

  const openSeeDocumentTypeModal = () => {
    if (!isModalSeeOpen) return null;
    return (
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <TextInput variant="formField" type="text" name="doc_type" disabled value={documentTypeData.doc_type} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <TextInput variant="formField" type="text" name="archiving_time" disabled value={documentTypeData.archiving_time} />
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

  const openUpdateDocumentTypeModal = () => {
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <TextInput variant="formField" type="text" name="doc_type" defaultValue={documentTypeData.doc_type} onChange={handleDocumentTypeData} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <TextInput variant="formField" type="text" name="archiving_time" defaultValue={documentTypeData.archiving_time} onChange={handleDocumentTypeData} />
        </label>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Alterar"
            onClick={handleUpdateAction}
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

  const openDeleteDocumentTypeModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar tipo de documento?</h2>
        <div className="modalButtonsContainer">
          <Button
            variant="primaryButton"
            text="Deletar"
            onClick={handleDeleteAction}
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
    <div className="documentTypeLayout">
      <div className="documentTypeSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
          onClick={() => {
            setIsModalOpen(true);
            setIsModalCreateOpen(true);
          }}
        />
        <SearchInput onChange={handleSearch} />
      </div>
      <List containerClassName="documentTypeListContainer">
        {documentTypeList.map((item) => (
          <ListItem
            description={item.doc_type}
            key={item.id}
            seeAction={async () => {
              setDocumentTypeData(await getDocumentTypeById(item.id));
              setIsModalOpen(true);
              setIsModalSeeOpen(true);
            }}
            updateAction={async () => {
              setDocumentTypeData(await getDocumentTypeById(item.id));
              setIsModalOpen(true);
              setIsModalUpdateOpen(true);
            }}
            deleteAction={async () => {
              setDocumentTypeData(await getDocumentTypeById(item.id));
              setIsModalOpen(true);
              setIsModalDeleteOpen(true);
            }}
          />
        ))}
      </List>
      {isModalOpen && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateDocumentTypeModal()))
        || (isModalSeeOpen && (openSeeDocumentTypeModal()))
        || (isModalUpdateOpen && (openUpdateDocumentTypeModal()))
        || (isModalDeleteOpen && (openDeleteDocumentTypeModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default DocumentTypeScreen;
