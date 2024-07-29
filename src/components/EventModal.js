import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EventModal = (props) => {
    console.log("hello");
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: ''
    });
    const [errorMessages, setErrorMessages] = useState({
        eventName: '',
        eventDate: '',
        general: ''
    });
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () =>{ setErrorMessages({ eventName: '', eventDate: '', general: '' }); setShow(false); }
    const handleShow = () => setShow(true);

    // Inline styles for buttons
    const ModalBackgroundColor = {
        backgroundColor: '#e9f2fa'
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const addEvent = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/addEvent`, formData);
            setSuccess('Event added successfully!');
            setErrorMessages({ eventName: '', eventDate: '', general: '' });
        } catch (error) {
            setSuccess('');
            if (error.response) {
                const { data } = error.response;
                let newErrors = { eventName: '', eventDate: '', general: '' };

                if (data.message) {
                    newErrors.general = data.message;
                }

                if (data.errors) {
                    Object.entries(data.errors).forEach(([field, message]) => {
                        if (field in newErrors) {
                            newErrors[field] = message;
                        }
                    });
                }

                setErrorMessages(newErrors);
            } else if (error.request) {
                setErrorMessages({ eventName: '', eventDate: '', general: 'No response from server. Please check your network connection.' });
            } else {
                setErrorMessages({ eventName: '', eventDate: '', general: 'An unexpected error occurred.' });
            }
            console.error('Error:', error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {props.data.length > 0 && 
                <Button variant="outline-danger" size="lg" onClick={handleShow}>
                    Add New Event
                </Button>
            }
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={ModalBackgroundColor}>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body style={ModalBackgroundColor}>
                    <Form onSubmit={addEvent}>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Event Name"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                            />
                            {errorMessages.eventName && <p style={{ color: 'red' }}>{errorMessages.eventName}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Execution Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter Event Date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                            />
                            {errorMessages.eventDate && <p style={{ color: 'red' }}>{errorMessages.eventDate}</p>}
                        </Form.Group>
                        <Button type="submit" className="custom-button">
                            {loading ? 'Adding...' : 'Add Event'}
                        </Button>
                        {loading && (
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        {errorMessages.general && <div className="alert alert-danger mt-3">{errorMessages.general}</div>}
                    </Form>
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

export default EventModal;
