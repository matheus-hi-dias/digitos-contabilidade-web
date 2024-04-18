import { useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, TextInput,
} from '../../components';
import './styles.scss';

function ClientsScreen() {
  const clientsList = [
    {
      id: 1, cod_tipo_doc: 1, tipo_doc: 'Joaozinho', temp_arquivamento: 5,
    },
    {
      id: 2, cod_tipo_doc: 1, tipo_doc: 'Empresa Ltda', temp_arquivamento: 5,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openCreateClientModal = () => {
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="clientName">
          Nome*:
          <input type="text" name="clientName" />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <select type="text" name="personType">
            {clientsList.map((item) => (
              <option key={item.id} value={item.cod_tipo_doc}>{item.tipo_doc}</option>
            ))}
          </select>
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <input type="text" name="cpfCnpj" />
        </label>
      </div>,
    );
  };

  const openSeeClientModal = () => {
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="clientName">
          Nome:
          <input type="text" name="clientName" />
        </label>

        <label htmlFor="personType">
          Tipo:
          <input type="text" name="personType" />
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ:
          <input type="text" name="cpfCnpj" />
        </label>
      </div>,
    );
  };

  const openUpdateClientModal = () => {
    handleOpenModal();
    setModalChildren(
      <div className="clientModal">
        <label htmlFor="clientName">
          Nome*:
          <input type="text" name="clientName" />
        </label>

        <label htmlFor="personType">
          Tipo*:
          <select type="text" name="personType">
            {clientsList.map((item) => (
              <option key={item.id} value={item.cod_tipo_doc}>{item.tipo_doc}</option>
            ))}
          </select>
        </label>

        <label htmlFor="cpfCnpj">
          CPF/CNPJ*:
          <input type="text" name="cpfCnpj" />
        </label>
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
            description={item.tipo_doc}
            key={item.id}
            seeAction={openSeeClientModal}
            updateAction={openUpdateClientModal}
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
