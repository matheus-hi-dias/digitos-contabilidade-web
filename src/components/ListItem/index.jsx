import { FaEdit, FaEye, MdDelete } from "../Icons";
import "./styles.scss";
const ListItem = ({ description, seeAction, updateAction, deleteAction }) => {
  return (
    <div className="listItemContainer">
      <span className="itemDescription">{description}</span>
      <span className="itemActions">
        <button className="itemActionButton" onClick={seeAction}>
          <FaEye size={20} />
        </button>
        <button className="itemActionButton" onClick={updateAction}>
          <FaEdit size={20} />
        </button>
        <button className="itemActionButton" onClick={deleteAction}>
          <MdDelete size={20} />
        </button>
      </span>
    </div>
  );
};

export default ListItem;
