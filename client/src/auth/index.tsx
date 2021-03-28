import React, {Component, createContext, FormEvent, useContext, useState} from "react";
import {Button, Container, Grid, Link, TextField} from "@material-ui/core";
import {AccessToken, AuthService, AuthServiceClient, DriveService, DriveServiceClient} from "srpcd-example-http-client";
import {Redirect} from "react-router-dom";

export const ServiceCtx = createContext<{ auth: AuthService, drive: DriveService }>({} as any)
export const useService = () => useContext(ServiceCtx);
export const isLoggedIn = () => !!localStorage.getItem('access_token');

export class ServiceProvider extends Component<any, any> {

  state: any = {
    auth: null,
    drive: null
  }

  async componentDidMount() {
    const headers = () => {
      const token_str = localStorage.getItem('access_token');
      const token = token_str && JSON.parse(token_str) as AccessToken
      return token ? {
        'Authorization': `bearer ${token.jwt}`,
        'Content-Type': 'application/json'
      } : undefined
    }

    const auth = await new AuthServiceClient('http://localhost:9000', {}).init()
    const drive = await new DriveServiceClient('http://localhost:9001', headers).init()
    //
    // const auth = await new AuthServiceClient('http://localhost:9000/auth', {}).init()
    // const drive = await new DriveServiceClient('http://localhost:9000/drive', headers).init()

    this.setState({auth, drive})
  }

  render() {
    const {auth, drive} = this.state;
    return auth && drive ? <ServiceCtx.Provider value={this.state}>
      {this.props.children}
    </ServiceCtx.Provider> : <p>Loading</p>
  }
}

export function useForceUpdate() {
  const [ val, setVal ] = useState(0);

  return () => setVal(val + 1)
}


export function Register() {
  const {auth} = useService();
  const forceUpdate = useForceUpdate();

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elm: any = e.target;
    const name = elm.elements.name.value;
    const email = elm.email.value;
    const password = elm.password.value;
    console.log(e);
    auth.register({
      name,
      email
    }, password).then(() => forceUpdate());
  }

  if (isLoggedIn()) return <Redirect path="/" to={'/drive'}/>;

  return <Container maxWidth={"xs"}>
    <form onSubmit={register} action="">

    <Grid style={{ height: '100vh' }} container direction={"column"} justify={"center"} spacing={2}>
      <Grid item>
        <TextField name={'name'} fullWidth label={'Name'} variant={"outlined"}/>
      </Grid>
      <Grid item>
        <TextField name={'email'} fullWidth label={'Email'} variant={"outlined"}/>
      </Grid>
      <Grid item>
        <TextField name={'password'} fullWidth label={'Password'} type={'password'} variant={"outlined"}/>
      </Grid>
      <Grid item>
        <Button fullWidth variant={"contained"} color={"primary"} type={"submit"}>Register</Button>
      </Grid>
      <Grid item>
        <Link href={'/login'}>login</Link>
      </Grid>
    </Grid>
    </form>
  </Container>
}

export function Login() {
  const {auth} = useService();
  const forceUpdate = useForceUpdate();

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elm: any = e.target;
    const email = elm.email.value;
    const password = elm.password.value;

    auth.login(email, password)
      .then((token) => localStorage.setItem('access_token', JSON.stringify(token)))
      .then(() => forceUpdate());
  }

  if (isLoggedIn()) return <Redirect path="/" to={'/drive'}/>;

  return <Container maxWidth={"xs"}>
    <form onSubmit={login} action="">

      <Grid style={{ height: '100vh' }} container direction={"column"} justify={"center"} spacing={2}>
        <Grid item>
          <TextField name={'email'} fullWidth label={'Email'} variant={"outlined"}/>
        </Grid>
        <Grid item>
          <TextField name={'password'} fullWidth label={'Password'} type={'password'} variant={"outlined"}/>
        </Grid>
        <Grid item>
          <Button fullWidth variant={"contained"} color={"primary"} type={"submit"}>Login</Button>
        </Grid>
      </Grid>
    </form>
  </Container>
}
