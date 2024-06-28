import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../services/AuthContext.js';

function Header({dashboard}) {
  const {isAuth,setIsAuth}=useContext(tokenAuthContext)
  const navigate=useNavigate()

  const logout=()=>{
    localStorage.clear()
    setIsAuth(false)
    navigate("/")
  }
  return (
    <div>
      <Navbar  className="bg-body-tertiary">
        <Container style={{minHeight:"0px"}}>
          <Navbar.Brand href="#home">
            React Bootstrap
          </Navbar.Brand>
          <Nav>
            
          </Nav>
          <Nav>
            {
                dashboard && <button onClick={logout} className='btn btn-outline-warning'>Logout</button>
            }
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
