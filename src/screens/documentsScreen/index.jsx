import { useEffect, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput,
} from '../../components';
import './styles.scss';

import {
  documentTypeList, clientsList, documentNatureList,
  documentLocalList,
} from '../../constants/mocks';
import { formatDate } from '../../utils/formatDate';
import { getDocuments, getDocumentByCode } from '../../services/documents';

function DocumentsScreen() {
  const [documentsList, setDocumentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [documentData, setDocumentData] = useState({
    document_code: undefined,
    name: '',
    archiving_date: undefined,
    nature_id: undefined,
    location_id: undefined,
    doc_type_id: undefined,
    client_id: undefined,
    employee_id: undefined,
  });
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);

  const handleDocumentTypeToggle = (id) => {
    const index = selectedDocumentTypes.indexOf(id);
    if (index === -1) {
      setSelectedDocumentTypes([...selectedDocumentTypes, id]);
    } else {
      setSelectedDocumentTypes(selectedDocumentTypes.filter((item) => item !== id));
    }
  };

  const handleClientsToggle = (id) => {
    const index = selectedClients.indexOf(id);
    if (index === -1) {
      setSelectedClients([...selectedClients, id]);
    } else {
      setSelectedClients(selectedClients.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    getDocuments().then(setDocumentsList);
  }, [isModalCreateOpen, isModalDeleteOpen, isModalUpdateOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setIsModalSeeOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalDeleteOpen(false);
    setDocumentData({
      document_code: undefined,
      name: '',
      archiving_date: undefined,
      nature_id: undefined,
      location_id: undefined,
      doc_type_id: undefined,
      client_id: undefined,
      employee_id: undefined,
    });
  };

  const handleDocumentData = (e) => {
    setDocumentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openCreateDocumentModal = () => {
    console.log('create modal');
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código*:
          <input type="text" name="document_code" onChange={handleDocumentData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" onChange={handleDocumentData} />
        </label>
        <label htmlFor="doc_type_id">
          Tipo*:
          <select type="text" name="doc_type_id" onChange={handleDocumentData}>
            {documentTypeList.map((item) => (
              <option key={item.id} value={item.id}>{item.doc_type}</option>
            ))}
          </select>
        </label>
        <label htmlFor="client_id">
          Cliente*:
          <select type="text" name="client_id" onChange={handleDocumentData}>
            {clientsList.map((item) => (
              <option key={item.id} value={item.id}>{item.name.concat(` (${item.cpfCnpj})`)}</option>
            ))}
          </select>
        </label>
        <label htmlFor="nature_id">
          Natureza*:
          <select type="text" name="nature_id" onChange={handleDocumentData}>
            {documentNatureList.map((item) => (
              <option key={item.id} value={item.id}>{item.nature}</option>
            ))}
          </select>
        </label>
        <label htmlFor="location_id">
          Local/caminho*:
          <select type="text" name="location_id" onChange={handleDocumentData}>
            {documentLocalList.map((item) => (
              <option key={item.id} value={item.id}>{item.doc_location}</option>
            ))}
          </select>
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openSeeDocumentModal = () => {
    console.log('see modal');
    if (!isModalSeeOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código:
          <input type="text" disabled name="document_code" value={documentData.document_code} />
        </label>
        <label htmlFor="name">
          Nome:
          <input type="text" disabled name="name" value={documentData.name} />
        </label>
        <label htmlFor="name">
          Tipo:
          <input type="text" disabled name="name" value={documentData.document_type.doc_type} />
        </label>
        <label htmlFor="name">
          Cliente:
          <input type="text" disabled name="name" value={documentData.client.name} />
        </label>
        <label htmlFor="name">
          Natureza:
          <input type="text" disabled name="name" value={documentData.document_nature.nature} />
        </label>
        <label htmlFor="name">
          Local/caminho:
          <input type="text" disabled name="name" value={documentData.document_location.doc_location} />
        </label>
        <label htmlFor="name">
          Data cadastro:
          <input type="date" disabled name="name" value={formatDate(documentData.archiving_date)} />
        </label>
        <label htmlFor="name">
          Data vencimento:
          <input type="date" disabled name="name" value={formatDate(documentData.archiving_date)} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Sair" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openUpdateDocumentModal = () => {
    console.log('update modal');
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código*:
          <input type="text" name="document_code" disabled readOnly defaultValue={documentData.document_code} onChange={handleDocumentData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <input type="text" name="name" defaultValue={documentData.name} onChange={handleDocumentData} />
        </label>
        <label htmlFor="doc_type_id">
          Tipo*:
          <select type="text" name="doc_type_id" defaultValue={documentData.doc_type_id} onChange={handleDocumentData}>
            {documentTypeList.map((item) => (
              <option key={item.id} value={item.id}>{item.doc_type}</option>
            ))}
          </select>
        </label>
        <label htmlFor="client_id">
          Cliente*:
          <select type="text" name="client_id" defaultValue={documentData.client_id} onChange={handleDocumentData}>
            {clientsList.map((item) => (
              <option key={item.id} value={item.id}>{item.name.concat(` (${item.cpfCnpj})`)}</option>
            ))}
          </select>
        </label>
        <label htmlFor="nature_id">
          Natureza*:
          <select type="text" name="nature_id" defaultValue={documentData.nature_id} onChange={handleDocumentData}>
            {documentNatureList.map((item) => (
              <option key={item.id} value={item.id}>{item.nature}</option>
            ))}
          </select>
        </label>
        <label htmlFor="location_id">
          Local/caminho*:
          <select type="text" name="location_id" defaultValue={documentData.location_id} onChange={handleDocumentData}>
            {documentLocalList.map((item) => (
              <option key={item.id} value={item.id}>{item.doc_location}</option>
            ))}
          </select>
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  useEffect(() => { console.log(documentData); }, [documentData]);

  const openDeleteDocumentModal = () => {
    console.log('delete modal');
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar documento?</h2>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Deletar" onClick={handleCloseModal} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  return (
    <div className="documentsLayout">
      <div className="documentsSearchAddContainer">
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
      <div className="documentsFilterContainer">
        <div className="documentsFilterContentDiv">
          <div>Tipo de documento</div>
          <List>
            {documentTypeList.map((item) => (
              <label key={item.id} htmlFor={item.id}>
                <input
                  type="checkbox"
                  name={item.id}
                  checked={selectedDocumentTypes.includes(item.id)}
                  onChange={() => handleDocumentTypeToggle(item.id)}
                />
                {item.doc_type}
              </label>
            ))}
          </List>
        </div>

        <div className="documentsFilterContentDiv">
          <div>Cliente</div>
          <List>
            {clientsList.map((item) => (
              <label key={item.id} htmlFor={item.id}>
                <input
                  type="checkbox"
                  name={item.id}
                  checked={selectedClients.includes(item.id)}
                  onChange={() => handleClientsToggle(item.id)}
                />
                {item.name.concat(` (${item.cpfCnpj})`)}
              </label>
            ))}
          </List>
        </div>
      </div>
      <List containerClassName="documentsListContainer">
        {documentsList.map((item) => (
          <ListItem
            description={item.document_code.toString().concat(' - ').concat(item.name)}
            key={item.document_code}
            seeAction={async () => {
              setDocumentData(await getDocumentByCode(item.document_code));
              setIsModalSeeOpen(true);
              setIsModalOpen(true);
            }}
            updateAction={async () => {
              setDocumentData(await getDocumentByCode(item.document_code));
              setIsModalUpdateOpen(true);
              setIsModalOpen(true);
            }}
            deleteAction={async () => {
              setDocumentData(await getDocumentByCode(item.document_code));
              setIsModalDeleteOpen(true);
              setIsModalOpen(true);
            }}
          />
        ))}
      </List>
      {isModalOpen
      && (
      <Modal onClose={handleCloseModal}>
        {
        (isModalCreateOpen && (openCreateDocumentModal()))
        || (isModalSeeOpen && (openSeeDocumentModal()))
        || (isModalUpdateOpen && (openUpdateDocumentModal()))
        || (isModalDeleteOpen && (openDeleteDocumentModal()))
      }
      </Modal>
      )}
    </div>
  );
}

export default DocumentsScreen;
