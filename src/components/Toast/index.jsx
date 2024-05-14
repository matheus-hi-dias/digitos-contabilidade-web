import ReactDOM from 'react-dom';
import { Close, Success } from '../Icons';
import './styles.scss';

const toasTypes = {
  success: {
    icon: <Success />,
    leftBarClass: 'successLeftBar',
    iconClass: 'successIcon',
    message: 'Salvo com sucesso!',
  },
  error: {
    icon: <Close />,
    leftBarClass: 'errorLeftBar',
    iconClass: 'errorIcon',
    message: 'Erro ao salvar',
  },
};

function Toast({ type }) {
  const {
    icon, leftBarClass, iconClass, message,
  } = toasTypes[type];
  const leftBar = `leftBar ${leftBarClass}`;
  const iconContainer = `iconContainer ${iconClass}`;
  return ReactDOM.createPortal(
    <div className="toastWrapper">
      <div className="toast">
        <div className={leftBar} />
        <span className={iconContainer}>
          {icon}
        </span>
        <span className="toastText">
          {message}
        </span>
      </div>
    </div>,
    document.getElementById('response-popup-root'),
  );
}

export default Toast;
