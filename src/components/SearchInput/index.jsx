import React from 'react';

import TextInput from '../TextInput';
import { BiSearch } from '../Icons';

export default function SearchInput() {
  return (
    <TextInput
      icon={<BiSearch className="inputSearchIcon" data-testid="search-icon" />}
      placeholder="Pesquisar..."
      variant="search"
    />
  );
}
