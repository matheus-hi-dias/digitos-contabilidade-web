import React from 'react';
import { Loading } from '../../components';
import './styles.scss';

export default function LoadingScreen() {
  return (
    <div className="loadingLayout">
      <Loading />
      Carregando...
    </div>
  );
}
