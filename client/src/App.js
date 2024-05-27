import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar';
import { AuthContext } from './context/auth.context';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          {user ? 
            <Route path='/' element={<Chat />} ></Route> : 
            <>
              <Route path='/login' element={<Login />} ></Route>
              <Route path='/register' element={<Register />} ></Route>
            </>
          }
          <Route path='*' element={<Navigate to="/" />}></Route>

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
