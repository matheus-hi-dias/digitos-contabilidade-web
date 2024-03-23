// eslint-disable-next-line import/no-cycle
import {
  Button, FaEdit, FaEye, MdDelete,
} from '..';
import './styles.scss';

function ListItem({
  description, seeAction, updateAction, deleteAction,
}) {
  return (
    <div className="listItemContainer">
      <span className="itemDescription">{description}</span>
      <span className="itemActions">
        <Button buttonCustomClass="itemActionButton" icon={<FaEye size={20} />} onClick={seeAction} />
        <Button buttonCustomClass="itemActionButton" icon={<FaEdit size={20} />} onClick={updateAction} />
        <Button buttonCustomClass="itemActionButton" icon={<MdDelete size={20} />} onClick={deleteAction} />
      </span>
    </div>
  );
}

export default ListItem;
