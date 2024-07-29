import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostEventModal = ({ show, handleClose, eventId }) => {
    const [feedbackUrl, setFeedbackUrl] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting

        const formData = new FormData();
        formData.append('EventId', eventId);
        formData.append('feedbackUrl', feedbackUrl);
        Array.from(files).forEach(file => formData.append('files[]', file));

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/postevent`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Post Event',
                    text: 'Your feedback and files have been submitted successfully!',
                });
                setFeedbackUrl('');
                setFiles([]);
                handleClose();
            }
        } catch (err) {
            setError('Error submitting feedback. Please try again.');
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Post Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" />
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Feedback URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Feedback URL"
                            value={feedbackUrl}
                            onChange={(e) => setFeedbackUrl(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Files</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            disabled={loading} // Disable file input during loading
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
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

export default PostEventModal;
