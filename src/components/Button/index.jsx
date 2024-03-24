/* eslint-disable react/button-has-type */
import React from 'react';
import './styles.scss';

function Button({
  icon,
  iconCustomClass,
  text,
  textCustomClass,
  buttonCustomClass,
  variant,
  type = 'submit',
  onClick,
  'data-testid': testId,
}) {
  return (
    <button
      type={type}
      className={`genericButton ${variant} ${buttonCustomClass}`}
      onClick={onClick}
      data-testid={testId}
    >
      {icon && <span className={`iconButton ${iconCustomClass}`}>{icon}</span>}
      {text && <span className={`textButton ${textCustomClass}`}>{text}</span>}
    </button>
  );
}
export default Button;
