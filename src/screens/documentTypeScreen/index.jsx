import { useEffect, useState } from 'react';

import {
  AddIcon,
  Button,
  List,
  ListItem,
  Modal,
  TextInput,
} from '../../components';
import './styles.scss';
import { documentTypeList } from '../../constants/mocks';

function DocumentTypeScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [documentTypeData, setDocumentTypeData] = useState({
    nature: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDocumentTypeData({
      nature: '',
    });
  };

  const handleDocumentTypeData = (e) => {
    setDocumentTypeData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateDocumentTypeModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <input type="text" name="doc_type" onChange={handleDocumentTypeData} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <input type="text" name="archiving_time" onChange={handleDocumentTypeData} />
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

  const openSeeDocumentTypeModal = (id) => {
    const selectedDocumentTypeData = documentTypeList.find((item) => item.id === id);
    setDocumentTypeData(selectedDocumentTypeData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <input type="text" name="doc_type" disabled value={selectedDocumentTypeData.doc_type} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <input type="text" name="archiving_time" disabled value={selectedDocumentTypeData.archiving_time} />
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

  const openUpdateDocumentTypeModal = (id) => {
    const selectedDocumentTypeData = documentTypeList.find((item) => item.id === id);
    setDocumentTypeData(selectedDocumentTypeData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="doc_type">
          Tipo de documento*:
          <input type="text" name="doc_type" defaultValue={selectedDocumentTypeData.doc_type} onChange={handleDocumentTypeData} />
        </label>
        <label htmlFor="archiving_time">
          Tempo de armazenamento*:
          <input type="text" name="archiving_time" defaultValue={selectedDocumentTypeData.archiving_time} onChange={handleDocumentTypeData} />
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

  useEffect(() => {}, [documentTypeData]);

  const openDeleteDocumentTypeModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <h2>Deletar tipo de documento?</h2>
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
    <div className="documentTypeLayout">
      <div className="documentTypeSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
          onClick={openCreateDocumentTypeModal}
        />
        <TextInput />
      </div>
      <List containerClassName="documentTypeListContainer">
        {documentTypeList.map((item) => (
          <ListItem
            description={item.doc_type}
            key={item.id}
            seeAction={() => openSeeDocumentTypeModal(item.id)}
            updateAction={() => openUpdateDocumentTypeModal(item.id)}
            deleteAction={() => openDeleteDocumentTypeModal(item.id)}
          />
        ))}
      </List>
      {isModalOpen && <Modal onClose={handleCloseModal}>{modalChildren}</Modal>}
    </div>
  );
}

export default DocumentTypeScreen;
