import { useEffect, useState } from 'react';
import { Button, Select, TextInput } from '../../components';
import './styles.scss';

import { getNatures } from '../../services/documentsNature';
import { setEmptyValues } from '../../utils';
import { createDocumentStorageLocal } from '../../services/documentsStorageLocal';

function DocumentStorageLocalScreen() {
  const [selectedNature, setSelectedNature] = useState('');
  const [documentNatureList, setDocumentNatureList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [local, setLocal] = useState('');

  useEffect(() => {
    getNatures().then(setDocumentNatureList).then(() => setIsLoading(false));
  }, []);

  const handleNatureChange = (event) => {
    const { value } = event.target;
    setSelectedNature(value);
  };

  const handleClearFields = () => {
    setSelectedNature('');
    setLocal('');
  };

  const handleCreateLocal = async () => {
    const data = {
      doc_location: local,
      nature_id: selectedNature,
    };

    await createDocumentStorageLocal(data);
    handleClearFields();
  };

  if (isLoading) {
    return <div className="documentStorageLocalScreen">Loading...</div>;
  }

  return (
    <div className="documentStorageLocalScreen">
      <div className="documentStorageContentContainer">
        <div className="selectInputContainer">
          <label htmlFor="documentNatureSelect">
            Natureza:
            <Select
              className="documentNatureSelect"
              name="documentNatureSelect"
              id="documentNatureSelect"
              value={selectedNature}
              onChange={handleNatureChange}
              options={setEmptyValues(documentNatureList)}
              optionKey="id"
              optionLabels={['nature']}
            />
          </label>
          <label htmlFor="documentNatureInput">
            Local:
            <TextInput
              variant="formField"
              type="text"
              name="documentNatureInput"
              id="documentNatureInput"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </label>
        </div>
        <div className="buttonLocalContainer">
          <Button
            buttonCustomClass="buttonDocLocalCustomClass"
            variant="primaryButton"
            text="Cadastrar"
            onClick={handleCreateLocal}
          />
          <Button
            buttonCustomClass="buttonDocLocalCustomClass"
            variant="primaryButton"
            text="Cancelar"
            onClick={handleClearFields}
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentStorageLocalScreen;
