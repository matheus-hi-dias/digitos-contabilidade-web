import { Button } from '../../components';
import './styles.scss';

function DocumentStorageLocalScreen() {
  const options = [{
    id: 0,
    value: '',
  }, {
    id: 1,
    value: 'Fisico',
  }, {
    id: 1,
    value: 'Digital',
  }];
  return (
    <div className="documentStorageLocalScreen">
      <div className="selectInputContainer">
        <label htmlFor="documentNatureSelect">
          Natureza:
          <select name="documentNatureSelect" id="documentNatureSelect">
            {options.map((item) => (
              <option key={item.id} value={item.id}>{item.value}</option>
            ))}
          </select>
        </label>
        <label htmlFor="documentNatureInput">
          Local:
          <input type="text" name="documentNatureInput" id="documentNatureInput" />
        </label>
      </div>
      <div>

        <Button variant="primaryButton" text="Cadastrar" />
        <Button variant="primaryButton" text="Cancelar" />
      </div>
    </div>
  );
}

export default DocumentStorageLocalScreen;
