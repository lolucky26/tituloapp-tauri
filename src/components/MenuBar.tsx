import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function MenuBar (){

  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="./">Titulo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="schools" >Escuela</Nav.Link>
            <Nav.Link href="students" >Alumnos</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default MenuBar;