import { useEffect, useRef, useState } from 'react';
import {
  AddIcon, Button, List, ListItem, Modal, SearchInput, Select,
  TextInput,
} from '../../components';
import './styles.scss';

import { formatDate, setEmptyValues } from '../../utils';
import {
  getDocuments, getDocumentByCode, createDocument, updateDocument,
  deleteDocument,
} from '../../services/documents';
import { getDocumentTypes } from '../../services/documentsType';
import { getClients } from '../../services/clientsService';
import { getNatures } from '../../services/documentsNature';
import { getDocumentStorageLocal } from '../../services/documentsStorageLocal';
import useToast from '../../hooks/useToast';

function DocumentsScreen() {
  const toast = useToast();

  const [documentsResponse, setDocumentsResponse] = useState([]);
  const [documentsList, setDocumentsList] = useState([]);
  const [documentsTypesList, setDocumentsTypesList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [documentNatureList, setDocumentNatureList] = useState([]);
  const [documentLocalList, setDocumentLocalList] = useState([]);
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
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const firstRender = useRef(true);

  const handleFilters = (documentTypesFilter, clientsFilter, search) => {
    let response = [...documentsResponse];
    if (clientsFilter.length > 0) {
      response = response.filter((document) => clientsFilter.includes(document.client_id));
    }
    if (documentTypesFilter.length > 0) {
      response = response
        .filter((document) => documentTypesFilter.includes(document.doc_type_id));
    }
    if (search) {
      response = response
        .filter((document) => document.document_code.toString().includes(search)
        || document.name.toUpperCase().includes(search.toUpperCase()));
    }
    setDocumentsList(response);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    handleFilters(selectedDocumentTypes, selectedClients, event.target.value);
  };

  const handleDocumentTypeToggle = (key) => {
    const newSelection = selectedDocumentTypes.includes(key)
      ? selectedDocumentTypes.filter((item) => item !== key)
      : [...selectedDocumentTypes, key];
    setSelectedDocumentTypes(newSelection);
    handleFilters(newSelection, selectedClients, searchText);
  };

  const handleClientsToggle = (key) => {
    const newSelection = selectedClients.includes(key)
      ? selectedClients.filter((item) => item !== key)
      : [...selectedClients, key];
    setSelectedClients(newSelection);
    handleFilters(selectedDocumentTypes, newSelection, searchText);
  };

  useEffect(() => {
    const loadData = async () => {
      const documents = await getDocuments();
      setDocumentsResponse(documents);
      setDocumentsList(documents);
      setDocumentsTypesList(await getDocumentTypes());
      setClientsList(await getClients());
      setDocumentNatureList(await getNatures());
      setDocumentLocalList(await getDocumentStorageLocal());
      setIsLoading(false);
      firstRender.current = false;
    };
    loadData();
  }, []);

  useEffect(() => {
    console.log('firstRender', firstRender.current);
    console.log('isModalOpen', isModalOpen);
    if (!isModalOpen && !firstRender.current) {
      const fetchData = async () => {
        const documents = await getDocuments();
        setDocumentsResponse(documents);
        setDocumentsList(documents);
      };
      fetchData();
    }
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

  const handleCreateDocument = async (event) => {
    try {
      event.preventDefault();
      await createDocument(documentData);
      toast.successToast('Documento criado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar documento', error);
      toast.errorToast('Erro ao criar documento');
    }
  };

  const handleUpdateDocument = async (event) => {
    try {
      event.preventDefault();
      await updateDocument(documentData.document_code, documentData);
      toast.successToast('Documento atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar documento', error);
      toast.errorToast('Erro ao atualizar documento');
    }
  };

  const handleDeleteDocument = async (event) => {
    try {
      event.preventDefault();
      await deleteDocument(documentData.document_code);
      toast.successToast('Documento deletado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar documento', error);
      toast.errorToast('Erro ao deletar documento');
    }
  };

  const openCreateDocumentModal = () => {
    if (!isModalCreateOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código*:
          <TextInput variant="formField" type="text" name="document_code" onChange={handleDocumentData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" type="text" name="name" onChange={handleDocumentData} />
        </label>

        <label htmlFor="doc_type_id">
          Tipo*:
          <Select type="text" name="doc_type_id" onChange={handleDocumentData} options={setEmptyValues(documentsTypesList)} optionKey="id" optionLabels={['doc_type']} />
        </label>
        <label htmlFor="client_id">
          Cliente*:
          <Select type="text" name="client_id" onChange={handleDocumentData} options={setEmptyValues(clientsList)} optionKey="id" optionLabels={['name', 'cpfCnpj']} />

        </label>
        <label htmlFor="nature_id">
          Natureza*:
          <Select type="text" name="nature_id" onChange={handleDocumentData} options={setEmptyValues(documentNatureList)} optionKey="id" optionLabels={['nature']} />

        </label>
        <label htmlFor="location_id">
          Local/caminho*:
          <Select type="text" name="location_id" onChange={handleDocumentData} options={setEmptyValues(documentLocalList)} optionKey="id" optionLabels={['doc_location']} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleCreateDocument} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openSeeDocumentModal = () => {
    if (!isModalSeeOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código:
          <TextInput variant="formField" type="text" disabled name="document_code" value={documentData.document_code} />
        </label>
        <label htmlFor="name">
          Nome:
          <TextInput variant="formField" type="text" disabled name="name" value={documentData.name} />
        </label>
        <label htmlFor="name">
          Tipo:
          <TextInput variant="formField" type="text" disabled name="name" value={documentsTypesList.find((docType) => docType.id === documentData.doc_type_id)?.doc_type || ''} />
        </label>
        <label htmlFor="name">
          Cliente:
          <TextInput
            variant="formField"
            type="text"
            disabled
            name="name"
            value={clientsList.find((client) => client.id === documentData.client_id) ? `${clientsList.find((client) => client.id === documentData.client_id).name} - ${clientsList.find((client) => client.id === documentData.client_id).cpfCnpj}` : ''}
          />
        </label>
        <label htmlFor="name">
          Natureza:
          <TextInput variant="formField" type="text" disabled name="name" value={documentNatureList.find((docNature) => docNature.id === documentData.nature_id)?.nature || ''} />
        </label>
        <label htmlFor="name">
          Local/caminho:
          <TextInput variant="formField" type="text" disabled name="name" value={documentLocalList.find((local) => local.id === documentData.location_id)?.doc_location || ''} />
        </label>
        <label htmlFor="name">
          Data cadastro:
          <TextInput variant="formField" type="date" disabled name="name" value={formatDate(documentData.archiving_date)} />
        </label>
        <label htmlFor="name">
          Data vencimento:
          <TextInput variant="formField" type="date" disabled name="name" value={formatDate(documentData.archiving_date)} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Sair" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openUpdateDocumentModal = () => {
    if (!isModalUpdateOpen) return null;
    return (
      <>
        <label htmlFor="document_code">
          Código*:
          <TextInput variant="formField" type="text" name="document_code" disabled readOnly defaultValue={documentData.document_code} onChange={handleDocumentData} />
        </label>
        <label htmlFor="name">
          Nome*:
          <TextInput variant="formField" type="text" name="name" defaultValue={documentData.name} onChange={handleDocumentData} />
        </label>
        <label htmlFor="doc_type_id">
          Tipo*:
          <Select type="text" name="doc_type_id" onChange={handleDocumentData} options={setEmptyValues(documentsTypesList)} optionKey="id" optionLabels={['doc_type']} defaultValue={documentData.doc_type_id} />
        </label>
        <label htmlFor="client_id">
          Cliente*:
          <Select type="text" name="client_id" onChange={handleDocumentData} options={setEmptyValues(clientsList)} optionKey="id" optionLabels={['name', 'cpfCnpj']} defaultValue={documentData.client_id} />
        </label>
        <label htmlFor="nature_id">
          Natureza*:
          <Select type="text" name="nature_id" onChange={handleDocumentData} options={setEmptyValues(documentNatureList)} optionKey="id" optionLabels={['nature']} defaultValue={documentData.nature_id} />
        </label>
        <label htmlFor="location_id">
          Local/caminho*:
          <Select type="text" name="location_id" onChange={handleDocumentData} options={setEmptyValues(documentLocalList)} optionKey="id" optionLabels={['doc_location']} defaultValue={documentData.location_id} />
        </label>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Cadastrar" onClick={handleUpdateDocument} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  const openDeleteDocumentModal = () => {
    if (!isModalDeleteOpen) return null;
    return (
      <>
        <h2>Deletar documento?</h2>
        <div className="modalButtonsContainer">
          <Button variant="primaryButton" text="Deletar" onClick={handleDeleteDocument} />
          <Button variant="primaryButton" text="Cancelar" onClick={handleCloseModal} />
        </div>
      </>
    );
  };

  if (isLoading) {
    return <div className="documentsLayout">Loading...</div>;
  }

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
        <SearchInput onChange={handleSearchTextChange} />
      </div>
      <div className="documentsFilterContainer">
        <div className="documentsFilterContentDiv">
          <div>Tipo de documento</div>
          <List>
            {documentsTypesList.map((item) => (
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
