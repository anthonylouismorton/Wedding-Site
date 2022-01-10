import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RSVP from './RSVP';
import { SiteContext } from '../context/siteContext';
import { useContext } from 'react';
import { LinkContainer } from "react-router-bootstrap";

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
          <Nav activeKey="/Home" className="me-auto">
            <Nav.Item>
              <LinkContainer to="/">
                <Nav.Link href="Home">Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="Venue">
                <Nav.Link href="Venue">Venue</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Link href="registry">Registry</Nav.Link>
            <Nav.Item>
              <LinkContainer to="WeddingPhotos">
                <Nav.Link href="WeddingPhotos">Wedding Photos</Nav.Link>
              </LinkContainer>
            </Nav.Item>
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