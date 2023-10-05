import React, {useState} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


const Header = () => {

const navigate = useNavigate();
const [error, setError] = useState(null);

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("signout Successfull")
    }).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
      
    });
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/home">Your Brand Name</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink}  to="/home">Home</Nav.Link>
        <Nav.Link as={NavLink}  to="/inbox">Inbox</Nav.Link>
        <Nav.Link as={NavLink}  to="/sent">Sent</Nav.Link>
      </Nav>
      <Nav>
        <Button variant="outline-primary" onClick={logoutHandler}>Logout</Button>
      </Nav>
    </Navbar.Collapse>
    {error && <Alert variant='danger'>{error}</Alert>}
  </Navbar>
  );
};

export default Header;