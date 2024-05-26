import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import './styles.scss';

function UnauthorizedScreen() {
  const navigate = useNavigate();

  return (
    <div className="unauthorizedScreenLayout">
      <h1>Acesso não autorizado</h1>
      <Button variant="primaryButton" text="Voltar" onClick={() => navigate('/')} />
    </div>
  );
}

export default UnauthorizedScreen;
