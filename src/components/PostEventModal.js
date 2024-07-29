import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PostEventModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Inline styles for buttons
    const ModalBackgroundColor = {
        backgroundColor: '#e9f2fa'
    };

    return (
        <>
            <a
                href="#"
                className="tableAction"
                title="Delete" onClick={handleShow}

            >POST EVENT</a>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={ModalBackgroundColor}>
                    <Modal.Title>Add Post Event</Modal.Title>
                </Modal.Header>
                <Modal.Body style={ModalBackgroundColor}>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Post</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Feedback Url</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Please Enter Google Form Url"
                            />
                        </Form.Group>
                    </Form>
                    <Button className="custom-button" onClick={handleClose}>
                        Add Post
                    </Button>
                </Modal.Body>
                <Modal.Footer style={ModalBackgroundColor} className='custom-footer'>
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

export default PostEventModal;
