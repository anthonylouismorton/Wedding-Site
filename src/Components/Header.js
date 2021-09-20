import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RSVP from './RSVP';
import GuestBook from './Guestbook'

export default class Header extends Component {
  state = {
    modalOpen: false
  }
  handleModal = () => {
    this.setState((prevStat) => {
      return{ modalOpen: !prevStat.modalOpen}
    });
  }
  
  render(){
    return(
      <><Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Anthony and Kristin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#venue">Venue</Nav.Link>
            <Nav.Link href="#registry">Registry</Nav.Link>
            <Nav.Link href="#pricing">Wedding Photos</Nav.Link>
            <Nav.Link onClick={this.handleModal} href="#pricing">GuestBook</Nav.Link>
            <Nav.Link onClick={this.handleModal} href="#rsvp">RSVP</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <RSVP modalOpen={this.state.modalOpen} handleModal={this.handleModal} />
      <GuestBook modalOpen={this.state.modalOpen} handleModal={this.handleModal} />

      </>
    )
    
  }
}