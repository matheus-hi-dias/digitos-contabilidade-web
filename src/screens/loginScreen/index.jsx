import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Button, FaUser } from '../../components';
import './styles.scss';

function LoginScreen() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmitLogin = (event) => {
    event.preventDefault();

    if (login === '' || password === '') {
      setError('Preencha todos os campos');
      return;
    }

    api.post('/auth/login', { login, password }).then((response) => {
      const { token } = response.data;
      localStorage.setItem('session', JSON.stringify(response.data));
      if (token) {
        navigate('/minha-area');
      }
    }).catch((err) => {
      if (err.response.status === 404) {
        setError('Usuário não encontrado');
      }
      if (err.response.status === 400) {
        setError('Usuário ou senha inválidos');
      }
    });
  };
  return (
    <div className="loginScreen">
      <div className="loginContainer">
        <h1>Login</h1>
        <FaUser className="loginIcon" size={136} />
        <form onSubmit={handleSubmitLogin}>
          {error && <span className="loginErrorMessage">{error}</span>}
          <input
            type="text"
            name="login"
            id="login"
            placeholder="Usuário ou e-mail"
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            onChange={handlePasswordChange}
          />
          <Button variant="primaryButton" type="submit" text="Entrar" buttonCustomClass="loginButton" />
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
