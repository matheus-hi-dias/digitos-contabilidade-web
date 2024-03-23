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
        <List>
          {documentTypeList.map((item) => (
            <ListItem description={item.tipo_doc} key={item.id} />
          ))}
        </List>
        <List>
          {clientsList.map((item) => (
            <ListItem description={item.tipo_doc} key={item.id} />
          ))}
        </List>
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
