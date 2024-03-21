import { Button, FaUser } from "../../components";
import "./styles.scss";
const LoginScreen = () => {
  return (
    <div className="loginScreen">
      <div className="loginContainer">
        <h1>Login</h1>
        <FaUser className="loginIcon" size={136} />
        <form>
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
          <Button variant={"primaryButton"} type="button" text={"Entrar"} buttonCustomClass="loginButton"/>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
