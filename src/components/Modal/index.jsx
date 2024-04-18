/* eslint-disable jsx-a11y/control-has-associated-label */
import ReactDOM from 'react-dom';
import './styles.scss';
import { Close } from '../Icons';

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="modalWrapper">
      <div className="modal">
        <button onClick={onClose} type="button" className="modalCloseButton">
          <Close size={24} />
        </button>
        <div className="modalContent">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
}

export default Modal;
