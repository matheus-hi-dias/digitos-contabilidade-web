import {
  AddIcon, Button, List, ListItem, TextInput,
} from '../../components';
import './styles.scss';

function UsersScreen() {
  const userList = [
    {
      id: 1, cod_tipo_doc: 1, tipo_doc: 'Joao', temp_arquivamento: 5,
    },
    {
      id: 2, cod_tipo_doc: 1, tipo_doc: 'Maria', temp_arquivamento: 5,
    },
  ];
  return (
    <div className="usersLayout">
      <div className="usersSearchAddContainer">
        <Button variant="secondaryButton" icon={<AddIcon size={24} />} text="Adicionar" />
        <TextInput />
      </div>
      <div className="usersListContainer">
        <List>
          {userList.map((item) => <ListItem description={item.tipo_doc} key={item.id} />)}
        </List>
      </div>
    </div>
  );
}

export default UsersScreen;
