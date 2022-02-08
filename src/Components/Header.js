import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import '../styling/header.css'

function Header() {

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
      <Navbar bg="none" variant="light">
          <Nav>
            <Nav.Item>
              <LinkContainer to="/Home">
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
              <LinkContainer to="RSVP">
                <Nav.Link href="RSVP">RSVP</Nav.Link>
              </LinkContainer>
            {shift && (
            <Nav.Item>
              <LinkContainer to="Dashboard">
                <Nav.Link href="Dashboard">Dashboard</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            )}
          </Nav>
      </Navbar>

      </>
    )
    
  }

  export default Header;