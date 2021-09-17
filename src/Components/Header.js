import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Header extends Component {
  render(){
    return(
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Anthony and Kristin</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Gallery</Nav.Link>
          <Nav.Link href="#features">Venue</Nav.Link>
          <Nav.Link href="#pricing">Registry</Nav.Link>
          <Nav.Link href="#pricing">Wedding Photos</Nav.Link>
          <Nav.Link href="#pricing">GuestBook</Nav.Link>
          <Nav.Link href="#pricing">RSVP</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    )
  }
}