import { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class RSVP extends Component{
  render(){
    return(
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
      show={this.props.modalOpen} onHide={this.props.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>RSVP</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleModal}>Close</Button>
          <Button variant="primary"onClick={this.props.handleModal}>Submit RSVP</Button>
        </Modal.Footer>
      </Modal>
    )
    
  }

}