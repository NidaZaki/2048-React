import Modal from 'react-bootstrap/Modal';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import ImageSlider from './ImageSlider';


function ModalPopUp() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <div id="bootstrap-overrides">
            <div className="how-to-play-section">
                <button type="button" className="score-container new-game how-to" onClick={handleShow}>
                    <i className="bi bi-info-square-fill"></i>
                How to Play</button>  
            </div>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>HOW TO PLAY 2048</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ImageSlider></ImageSlider>
              </Modal.Body>
              <Modal.Footer>
                <button className="score-container new-game how-to btn btn-primary" variant="primary" onClick={handleClose}> Close </button>
              </Modal.Footer>
            </Modal>
          </div>
    );
  }
  
  export default ModalPopUp;