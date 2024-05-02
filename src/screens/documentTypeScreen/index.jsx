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

function DocumentTypeScreen() {
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
      getDocumentTypes().then(setDocumentTypeList);
    }
  }, [isModalCreateOpen, isModalDeleteOpen, isModalUpdateOpen]);

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

  const handleCreateAction = async (event) => {
    event.preventDefault();
    await createDocumentType(documentTypeData);
    handleCloseModal();
  };

  const handleUpdateAction = async (event) => {
    event.preventDefault();
    await updateDocumentType(documentTypeData.id, documentTypeData);
    handleCloseModal();
  };

  const handleDeleteAction = async (event) => {
    event.preventDefault();
    await deleteDocumentType(documentTypeData.id);
    handleCloseModal();
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
        <SearchInput />
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
