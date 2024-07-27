import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EventModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Inline styles for buttons
    const ModalBackgroundColor = {
        backgroundColor : '#e9f2fa'
    };

    return (
        <>
            {props.data.length > 0 && 
                <Button variant = "outline-danger" size = "lg" onClick={handleShow}>
                    Add New Event
                </Button>
            }
            <Modal show={show} onHide={handleClose} size = "lg">
                <Modal.Header closeButton style = {ModalBackgroundColor}>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body style = {ModalBackgroundColor}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Event Name"
                               
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Execution Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter Event Date"
                                
                            />
                        </Form.Group>
                    </Form>
                    <Button className = "custom-button" onClick={handleClose}>
                        Add Event
                    </Button>
                </Modal.Body>
                <Modal.Footer style = {ModalBackgroundColor} className='custom-footer'>
                    <img
                        src="images/logo1.png"
                        alt="Logo"
                        className="img-fluid"
                        style={{ maxHeight: '155px' }} // Ensure the logo scales well
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventModal;
