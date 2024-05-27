import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { postRequest } from '../utils/api.service';
import { setLocalStroage } from '../utils/localStorage.service';
import { AuthContext } from '../context/auth.context';

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({name: '', email: '', password: ''});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AuthContext);

  const change = (e, name) => {
    setRegisterInfo(old => ({...old, [name]: e.target.value}) );
  }

  const register = async(e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);
    const res = await postRequest('/user/register', registerInfo);
    if(res?.error){
      setError(res.message);
      console.log(res,"res");
    }else{
      setLocalStroage('user', res);
      setRegisterInfo({name: '', email: '', password: ''});
      setUser(res);
    }
    setIsLoading(false);
  }

  return (
    <Form onSubmit={register}>
      <Row className='justify-content-center' style={{marginTop: '15%'}}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>

            <Form.Control type='text' placeholder='Name' onChange={(e) => change(e, 'name')} />
            <Form.Control type='email' placeholder='Email' onChange={(e) => change(e, 'email')} />
            <Form.Control type='password' placeholder='Password' onChange={(e) => change(e, 'password')} />
            <Button variant="primary" type='submit' disabled={isLoading}>{isLoading ? 'Creating account...' : 'Register'}</Button>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Stack>
        </Col>
      </Row>
    </Form>
  )
}

export default Register