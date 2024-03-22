import { useNavigate } from "react-router-dom";
import { Button, FaUser } from "../../components";
import "./styles.scss";
const LoginScreen = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/minha-area');
  }
  return (
    <div className="loginScreen">
      <div className="loginContainer">
        <h1>Login</h1>
        <FaUser className="loginIcon" size={136} />
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Usuário ou e-mail"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
          />
          <Button variant={"primaryButton"} type="submit" text={"Entrar"} buttonCustomClass="loginButton" />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
