import ReactDOM from 'react-dom';
import { Close, Success } from '../Icons';
import './styles.scss';

function ResponsePopup({ success }) {
  return ReactDOM.createPortal(
    <div className="responsePopupWrapper">
      <div className={`responsePopup ${success ? 'successPopup' : 'errorPopup'}`}>
        <div className={`leftBar ${success ? 'successLeftBar' : 'errorLeftBar'}`} />
        <span className={`iconContainer ${success ? 'successIcon' : 'errorIcon'}`}>
          {success
            ? <Success size={36} className="icon" />
            : <Close size={36} className="icon" />}
        </span>
        <span className="responsePopupText">
          {success ? 'Salvo com sucesso!' : 'Erro ao salvar'}
        </span>
      </div>
    </div>,
    document.getElementById('response-popup-root'),
  );
}

export default ResponsePopup;
