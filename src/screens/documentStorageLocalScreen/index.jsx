import { useEffect, useState } from 'react';
import {
  Button, Select, TextInput,
} from '../../components';
import LoadingScreen from '../LoadingScreen';

import './styles.scss';

import { getNatures } from '../../services/documentsNature';
import { setEmptyValues } from '../../utils';
import { createDocumentStorageLocal } from '../../services/documentsStorageLocal';
import useToast from '../../hooks/useToast';

function DocumentStorageLocalScreen() {
  const toast = useToast();

  const [selectedNature, setSelectedNature] = useState('');
  const [documentNatureList, setDocumentNatureList] = useState([]);
  const [local, setLocal] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const fetchData = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      if (loadingError) {
        setLoadingError(false);
      }
      const response = await getNatures();
      setDocumentNatureList(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoadingError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNatureChange = (event) => {
    const { value } = event.target;
    setSelectedNature(value);
  };

  const handleClearFields = () => {
    setSelectedNature('');
    setLocal('');
  };

  const handleErrorToast = (error, defaultMessage) => {
    if (error.response.data.message.toLowerCase() === 'document local already exists') {
      toast.errorToast('Local já cadastrado');
      return;
    }
    if (error.response.data.message.toLowerCase() === 'nature not found') {
      toast.errorToast('Natureza não encontrada');
      return;
    }
    if (error.response.data.message.toLowerCase() === 'local not found') {
      toast.errorToast('Local não encontrado');
      return;
    }
    toast.errorToast(defaultMessage);
  };

  const handleCreateLocal = async () => {
    try {
      const data = {
        doc_location: local,
        nature_id: selectedNature,
      };

      await createDocumentStorageLocal(data);
      toast.successToast('Local cadastrado com sucesso!');
      handleClearFields();
    } catch (error) {
      console.error('Erro ao cadastrar local', error);
      handleErrorToast(error, 'Erro ao cadastrar local');
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (loadingError) {
    return (
      <div className="documentStorageLocalScreen">
        <h1>Erro ao carregar dados</h1>
        <Button variant="primaryButton" text="Recarregar página" onClick={fetchData} />
      </div>
    );
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
