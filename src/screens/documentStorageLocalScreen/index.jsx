import { useState } from 'react';
import { Button } from '../../components';
import './styles.scss';

import { documentLocalList } from '../../constants/mocks';

function DocumentStorageLocalScreen() {
  const [selectedNature, setSelectedNature] = useState('');

  const handleNatureChange = (event) => {
    const { value } = event.target;
    setSelectedNature(value);
  };

  return (
    <div className="documentStorageLocalScreen">
      <div className="documentStorageContentContainer">

        <div className="selectInputContainer">
          <label htmlFor="documentNatureSelect">
            Natureza:
            <select name="documentNatureSelect" id="documentNatureSelect" className="documentNatureInteractive documentNatureSelect" value={selectedNature} onChange={handleNatureChange}>
              {documentLocalList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="documentNatureInput">
            Local:
            <input type="text" name="documentNatureInput" id="documentNatureInput" className="documentNatureInteractive documentNatureInput" />
          </label>
        </div>
        <div className="buttonLocalContainer">

          <Button buttonCustomClass="buttonDocLocalCustomClass" variant="primaryButton" text="Cadastrar" />
          <Button buttonCustomClass="buttonDocLocalCustomClass" variant="primaryButton" text="Cancelar" />
        </div>
      </div>
    </div>
  );
}

export default DocumentStorageLocalScreen;
