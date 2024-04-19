import React from 'react';
import {
  FaEdit, FaEye, MdDelete,
} from '../Icons';
import Button from '../Button';
import './styles.scss';

function ListItem({
  description,
  seeAction,
  updateAction,
  deleteAction,
  seeButton = true,
  updateButton = true,
  deleteButton = true,
}) {
  return (
    <div className="listItemContainer">
      <span className="itemDescription">{description}</span>
      <span className="itemActions">
        {
          seeButton
          && (<Button data-testid="see-button" buttonCustomClass="itemActionButton" icon={<FaEye size={20} />} onClick={seeAction} />)
        }
        {
          updateButton
        && (<Button data-testid="update-button" buttonCustomClass="itemActionButton" icon={<FaEdit size={20} />} onClick={updateAction} />)
        }
        {
          deleteButton && (
            <Button data-testid="delete-button" buttonCustomClass="itemActionButton" icon={<MdDelete size={20} />} onClick={deleteAction} />
          )
        }
      </span>
    </div>
  );
}

export default ListItem;
