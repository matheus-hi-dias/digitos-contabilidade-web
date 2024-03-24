import React from 'react';
import { BiSearch } from '../Icons';
import './styles.scss';

function TextInput() {
  return (
    <div className="inputSearchContainer">
      <input type="text" placeholder="Pesquisar..." className="inputSearch" data-testid="search-input" />
      <BiSearch className="inputSearchIcon" data-testid="search-icon" />
    </div>
  );
}

export default TextInput;
