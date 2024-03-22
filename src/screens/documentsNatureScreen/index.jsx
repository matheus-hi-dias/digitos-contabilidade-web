import {
  AddIcon, Button, List, ListItem, TextInput,
} from '../../components';
import './styles.scss';

function DocumentsNatureScreen() {
  const documentTypeList = [
    {
      id: 1, cod_tipo_doc: 1, tipo_doc: 'Recibo', temp_arquivamento: 5,
    },
    {
      id: 2, cod_tipo_doc: 1, tipo_doc: 'Nota Fiscal', temp_arquivamento: 5,
    },
  ];
  return (
    <div className="documentNatureLayout">
      <div className="documentNatureSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" />
        <TextInput />
      </div>
      <div className="documentNatureListContainer">
        <List>
          {documentTypeList.map((item) => <ListItem description={item.tipo_doc} key={item.id} />)}
        </List>
      </div>
    </div>
  );
}

export default DocumentsNatureScreen;
