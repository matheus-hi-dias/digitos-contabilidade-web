import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, TextInput,
} from '../../components';
import './styles.scss';

import { documentNatureList } from '../../constants/mocks';

function DocumentsNatureScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [natureData, setNatureData] = useState({
    nature: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNatureData({
      nature: '',
    });
  };

  const handleNatureData = (e) => {
    setNatureData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateNatureModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="nature">
          Natureza do documento*:
          <input type="text" name="nature" onChange={handleNatureData} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>,
    );
  };

  const openUpdateNatureModal = (id) => {
    const selectedClientData = documentNatureList.find((item) => item.id === id);
    setNatureData(selectedClientData);
    handleOpenModal();
    setModalChildren(
      <>
        <label htmlFor="nature">
          Natureza do documento*:
          <input type="text" name="nature" onChange={handleNatureData} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Alterar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>,
    );
  };

  useEffect(() => { }, [natureData]);

  const openDeleteNatureModal = () => {
    handleOpenModal();
    setModalChildren(
      <>
        <h2>Deletar natureza?</h2>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Deletar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>,
    );
  };

  return (
    <div className="documentNatureLayout">
      <div className="documentNatureSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" onClick={openCreateNatureModal} />
        <TextInput />
      </div>
      <List containerClassName="documentNatureListContainer">
        {documentNatureList.map((item) => (
          <ListItem
            description={item.nature}
            key={item.id}
            seeButton={false}
            updateAction={() => openUpdateNatureModal(item.id)}
            deleteAction={openDeleteNatureModal}
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

export default DocumentsNatureScreen;
