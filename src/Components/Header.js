import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RSVP from './RSVP';
import { SiteContext } from '../context/siteContext';
import { useContext } from 'react';

function Header() {
  const modal = useContext(SiteContext)

  // state = {
  //   modalOpen: false
  // }
  // handleModal = () => {
  //   this.setState((prevStat) => {
  //     return{ modalOpen: !prevStat.modalOpen}
  //   });
  // }

  const handleModal = () => {
    console.log(!modal.modal)
    modal.setModal(!modal.modal)
  }
  
    return(
      <><Navbar>
        <Container>
          <Navbar.Brand href="home">Anthony and Kristin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Home">Home</Nav.Link>
            <Nav.Link href="venue">Venue</Nav.Link>
            <Nav.Link href="registry">Registry</Nav.Link>
            <Nav.Link href="WeddingPhotos">Wedding Photos</Nav.Link>
            <Nav.Link href="EngagementPhotos">Engagement Photos</Nav.Link>
            <Nav.Link onClick={handleModal}>RSVP</Nav.Link>
            {/* <Nav.Link onClick={handleModal} href="GuestBook">GuestBook</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <RSVP modalOpen={modal.modal} handleModal={handleModal}/>
      {/* <GuestBook modalOpen={modal.modal} handleModal={handleModal}/> */}

      </>
    )
    
  }

  export default Header;