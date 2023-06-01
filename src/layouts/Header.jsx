
import { useState } from 'react';
import { Container, Navbar, Nav, Card, Image } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Avatar from '../assets/avatar.png';



export default function Header() {
  const [show, setShow] = useState(false);


  return (
    <>
      <Navbar bg="light" expand={show} className="mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Card style={{ width: '20rem', flexDirection: 'row' }}>
                <Card.Img variant="top" src={Avatar} style={{ width: 60, height: 60, marginTop: 'auto', marginBottom: 'auto' }} />
                <Card.Body>
                  <Card.Title>Anastasia Kovtun</Card.Title>
                  <Card.Subtitle>firstsunset@gmail.com</Card.Subtitle>
                </Card.Body>
              </Card>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Posts List</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
