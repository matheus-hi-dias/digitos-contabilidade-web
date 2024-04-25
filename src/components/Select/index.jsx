/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './styles.scss';

function Select({
  label, options, className = '', optionKey, optionLabels, onChange, ...rest
}) {
  return (
    <div className={`selectClass ${className}`}>
      {label && <label>{label}</label>}
      <select onChange={onChange} {...rest}>
        {options?.map((option) => (
          <option key={option[optionKey]} value={option[optionKey]}>
            {optionLabels.length > 1 ? optionLabels.reduce((acc, key) => {
              const response = option[key] === '' ? option[key] : acc.concat(` ${acc.length > 0 ? ' - ' : ''} ${option[key]}`);
              return response;
            }, '') : option[optionLabels[0]]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
