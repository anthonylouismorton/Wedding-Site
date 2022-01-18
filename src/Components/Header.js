import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import RSVP from './RSVP';
import { SiteContext } from '../context/siteContext';
import { useContext, useEffect, useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const modal = useContext(SiteContext)
  const handleModal = () => {
    modal.setModal(!modal.modal)
  }

  function useKey(key) {
    // Keep track of key state
    const [pressed, setPressed] = useState(false)

    // Does an event match the key we're watching?
    const match = event => key === event.key

    // Event handlers
    const onDown = event => {
        if (match(event)) setPressed(true)
    }

    const onUp = event => {
        if (match(event)) setPressed(false)
    }

    // Bind and unbind events
    useEffect(() => {
        window.addEventListener("keydown", onDown)
        window.addEventListener("keyup", onUp)
        return () => {
            window.removeEventListener("keydown", onDown)
            window.removeEventListener("keyup", onUp)
        }
    })

    return pressed
}
  const and = (a,b,c) => a && b && c
  const shift = and(useKey(`${process.env.REACT_APP_SECRETKEY1}`), useKey(`${process.env.REACT_APP_SECRETKEY2}`), useKey(`${process.env.REACT_APP_SECRETKEY3}`))
  
    return(
      <>
      <Navbar>
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
            <Nav.Item>
              <LinkContainer to="EngagementPhotos">
                <Nav.Link href="EngagementPhotos">Engagement Photos</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={handleModal}>RSVP</Nav.Link>
            </Nav.Item>
            {shift && (
            <Nav.Item>
              <LinkContainer to="Dashboard">
                <Nav.Link href="Dashboard">Dashboard</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            )}
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