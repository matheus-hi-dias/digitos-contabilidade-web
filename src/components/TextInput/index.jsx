/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './styles.scss';

function TextInput({
  variant, placeholder, customClass, icon, error, errorMessage, type = 'text', ...rest
}) {
  const styleClass = {
    search: 'inputSearchContainer',
    formField: 'formFieldContainer',
  };
  return (
    <div className={`${styleClass[variant]} ${customClass || ''} ${error && 'fieldWithError'}`}>
      <input type={type} placeholder={placeholder} className="inputSearch" data-testid="search-input" {...rest} />
      {icon && icon}
      {error && (
        <span className="errorMessage">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default TextInput;
