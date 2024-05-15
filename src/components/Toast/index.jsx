import { useEffect, useRef } from 'react';
import useToast from '../../hooks/useToast';
import { Close, Success } from '../Icons';
import './styles.scss';

const toasTypes = {
  success: {
    icon: <Success />,
    leftBarClass: 'successLeftBar',
    iconClass: 'successIcon',
  },
  error: {
    icon: <Close />,
    leftBarClass: 'errorLeftBar',
    iconClass: 'errorIcon',
  },
};

function Toast({ message, type, id }) {
  const {
    icon, leftBarClass, iconClass,
  } = toasTypes[type];
  const toast = useToast();

  const timerID = useRef(null);

  const handleDismiss = () => {
    toast.removeToast(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 6000);
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);
  const leftBar = `leftBar ${leftBarClass}`;
  const iconContainer = `iconContainer ${iconClass}`;
  return (

    <div className="toast">
      <div className={leftBar} />
      <span className={iconContainer}>
        {icon}
      </span>
      <span className="toastText">
        {message}
      </span>
    </div>
  );
}

export default Toast;
