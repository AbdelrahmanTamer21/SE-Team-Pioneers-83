import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import {UserContext} from './UserContext';
import {useContext} from 'react';

function TopBar() {
    const { isLoggedIn, userRole, updateUser } = useContext(UserContext);
    const handleLogin = () => {
        updateUser('admin', true);
    }
    const handleLogout = () => {
        updateUser(null, false);
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Donation System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
            <><Nav.Link href="#home">Home</Nav.Link><Nav.Link href="#link">Link</Nav.Link><NavDropdown title="Dropdown" id="basic-nav-dropdown">
                              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">
                                  Another action
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item href="#action/3.4">
                                  Separated link
                              </NavDropdown.Item>
                          </NavDropdown></>
                ) : null}
          </Nav>
          <Nav>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar;