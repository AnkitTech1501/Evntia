import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const EventModal = ({ show, handleClose, clientId, compId, refreshData }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, {
                Eventname: eventName,
                clientId,
                compId,
                Eventdate: eventDate,
                Status: status
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Created',
                    text: 'Your event has been created successfully!',
                });
                setEventName('');
                setEventDate('');
                setStatus('Pending');
                handleClose();
                refreshData(); // Call the callback to refresh the data
            }
        } catch (err) {
            setError('Error creating event. Please try again.');
            console.error(err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="hidden"
                            value={clientId}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="hidden"
                            value={compId}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Execution Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter Event Date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="hidden"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button className="mt-3" variant="primary" type="submit">
                        Add Event
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <img
                    src="images/logo1.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxHeight: '155px' }}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;
