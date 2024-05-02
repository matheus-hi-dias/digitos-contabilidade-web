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

function DocumentsNatureScreen() {
  const [documentNatureList, setDocumentNatureList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [natureData, setNatureData] = useState({
    nature: '',
  });

  const {
    setErrors,
  } = useErrors();

  useEffect(() => {
    getNatures().then((resp) => setDocumentNatureList(resp));
  }, [isModalOpen]);

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

  const handleCreateNature = async (event) => {
    event.preventDefault();
    await createNature(natureData);
    handleCloseModal();
  };

  const handleUpdateNature = async (event) => {
    event.preventDefault();
    await updateNature(natureData.id, natureData);
    handleCloseModal();
  };

  const handleDeleteNature = async (event) => {
    event.preventDefault();
    await deleteNature(natureData.id);
    handleCloseModal();
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
        <SearchInput />
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
