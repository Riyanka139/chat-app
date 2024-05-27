import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/auth.context';
import { postRequest } from '../utils/api.service';
import { setLocalStroage } from '../utils/localStorage.service';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: ''});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AuthContext);

  const change = (e, name) => {
    setLoginInfo(old => ({...old, [name]: e.target.value}) );
  }

  const login = async(e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);
    const res = await postRequest('/user/login',loginInfo);
    if(res?.error){
      setError(res.message);
      console.log(res,"res");
    }else{
      setLocalStroage('user', res);
      setLoginInfo({ email: '', password: ''});
      setUser(res);
    }
    setIsLoading(false);
  }

  return (
    <Form onSubmit={login}>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>

            <Form.Control type='email' placeholder='Email' onChange={(e) => change(e, 'email')} />
            <Form.Control type='password' placeholder='Password' onChange={(e) => change(e, 'password')} />
            <Button variant="primary" type='submit' disabled={isLoading}>{isLoading ? 'Getting you in...' : 'Login'}</Button>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Stack>
        </Col>
      </Row>
    </Form>
  )
}

export default Login