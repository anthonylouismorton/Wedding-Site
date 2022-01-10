import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function RSVP(props){
    return(
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
      show={props.modalOpen} onHide={props.handleModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>RSVP</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModal}>Close</Button>
          <Button variant="primary"onClick={props.handleModal}>Submit RSVP</Button>
        </Modal.Footer>
      </Modal>
    )
    
  }

  export default RSVP;