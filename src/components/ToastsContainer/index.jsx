/* eslint-disable react/jsx-props-no-spreading */
import Toast from '../Toast';
import './styles.scss';

function ToastsContainer({ toasts }) {
  return (
    <div className="toastsContainer">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

export default ToastsContainer;
