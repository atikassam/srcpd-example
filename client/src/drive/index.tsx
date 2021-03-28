import {Component, createContext, useContext} from "react";
import {Button} from "@material-ui/core";
import {AccessToken, AuthService, AuthServiceClient, DriveService, DriveServiceClient} from "srpcd-example-http-client";

export const ServiceCtx = createContext<{ auth: AuthService, drive: DriveService }>({} as any)

const useService = () => useContext(ServiceCtx);
export class ServiceProvider extends Component<any, any> {

  state: any = {
    auth: null ,
    drive: null
  }

  async componentDidMount() {
    const headers = () =>{
      const token_str = localStorage.getItem('access_token') ;
      const token = token_str && JSON.parse(token_str) as AccessToken
      return token ? {
        'Authorization': `bearer ${token.jwt}`
      } : {}
    }
    const auth = await new AuthServiceClient('http://localhost:9000', {}).init()
    const drive = await new DriveServiceClient('http://localhost:9001', headers).init()

    this.setState({ auth, drive })
  }

  render() {
    const { auth, drive } = this.state;
    return auth && drive ? <ServiceCtx.Provider value={this.state}>
      { this.props.children }
    </ServiceCtx.Provider> : <p>Loading</p>
  }
}


export function Register() {
  const { auth } = useService();
  const register = () => auth.register({
    name: 'Test user',
    email: 'Email'
  }, 'password');

  return <Button variant={"contained"} color={"primary"} onClick={register}>Register</Button>
}

export function Login() {
  const { auth } = useService();
  const login = () => auth.login('Email', 'password')
    .then((token) => localStorage.setItem('access_token', JSON.stringify(token)));

  return <Button variant={"contained"} color={"primary"} onClick={login}>login</Button>
}
