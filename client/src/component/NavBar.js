import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Notification from './Notification';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg='dark' data-bs-theme="dark" className='mb-4'>
      <Container className='text-white'>
        <Navbar.Brand href='/' className='fs-2'>Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar"/>

       {user && <span className='text-warning'>Loggin as {user?.name}</span>}
        
        <Nav>
          {user ? 
          <>
          <Notification />
            <Link to="/login" className='link-light text-decoration-none' onClick={() => {logout()}}>Logout</Link>
          </>: 
            <>
              <Link to="/login" className='link-light text-decoration-none me-4'>Login</Link>
              <Link to="/register" className='link-light text-decoration-none'>Register</Link>
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;