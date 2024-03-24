import { useState } from 'react';
import {
  AddIcon, Button, List, ListItem, TextInput,
} from '../../components';
import './styles.scss';

function DocumentsScreen() {
  const documentTypeList = [
    {
      id: 1,
      cod_tipo_doc: 1,
      tipo_doc: 'Recibo',
      temp_arquivamento: 5,
    },
    {
      id: 2,
      cod_tipo_doc: 1,
      tipo_doc: 'Nota Fiscal',
      temp_arquivamento: 5,
    },
  ];

  const clientsList = [
    {
      id: 1,
      cod_tipo_doc: 1,
      tipo_doc: 'Joao',
      temp_arquivamento: 5,
    },
    {
      id: 2,
      cod_tipo_doc: 1,
      tipo_doc: 'Empresa Ltda.',
      temp_arquivamento: 5,
    },
  ];

  const documentsList = [
    {
      id: 1,
      cod_tipo_doc: 1,
      tipo_doc: 'Documento 1',
      temp_arquivamento: 5,
    },
    {
      id: 2,
      cod_tipo_doc: 1,
      tipo_doc: 'Documento 2',
      temp_arquivamento: 5,
    },
  ];

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

  return (
    <div className="documentsLayout">
      <div className="documentsSearchAddContainer">
        <Button
          variant="secondaryButton"
          icon={<AddIcon size={24} />}
          text="Adicionar"
        />
        <TextInput />
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
                {item.tipo_doc}
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
                {item.tipo_doc}
              </label>
            ))}
          </List>
        </div>
      </div>
      <List containerClassName="documentsListContainer">
        {documentsList.map((item) => (
          <ListItem description={item.tipo_doc} key={item.id} />
        ))}
      </List>
    </div>
  );
}

export default DocumentsScreen;
