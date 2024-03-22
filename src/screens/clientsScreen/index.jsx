import {
  AddIcon, Button, List, ListItem, TextInput,
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

  return (
    <div className="clientsLayout">
      <div className="clientsSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" />
        <TextInput />
      </div>
      <div className="clientsListContainer">
        <List>
          {clientsList.map((item) => <ListItem description={item.tipo_doc} key={item.id} />)}
        </List>
      </div>
    </div>
  );
}

export default ClientsScreen;
