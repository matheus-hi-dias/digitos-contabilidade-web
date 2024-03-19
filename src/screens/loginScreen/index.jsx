import { Button } from "../../components";
const LoginScreen = () => {
 return (
  <div>
    <div><h1>Login</h1>
      <form>
        <div>
          <input type="text" name="username" id="username" />
          <input type="password" name="password" id="password" />
          <Button variant={"primaryButton"}/>
        </div>
      </form>
    </div>
  </div>
 ) 
}

export default LoginScreen;