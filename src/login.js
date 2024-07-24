import axios from 'axios';
import React, { useRef, useState } from 'react';

export default function Register() {
    const myFormData = useRef(null);
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading

    const SubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(myFormData.current);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        setLoading(true); // Start loading

        try {
            const response = await axios.post("http://150.0.0.187:5001/api/login", data);
            setSuccess('Login successful!');
            setErrorMessages({ email: '', password: '', general: '' });
            console.log('Success:', response.data);
        } catch (error) {
            setSuccess('');

            if (error.response) {
                const { data } = error.response;

                // Reset error messages
                let newErrors = { email: '', password: '', general: '' };

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
                setErrorMessages({ email: '', password: '', general: 'No response from server. Please check your network connection.' });
            } else {
                setErrorMessages({ email: '', password: '', general: 'An unexpected error occurred.' });
            }

            console.error('Error:', error.response ? error.response.data : error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div id="section1">
            <div className="container">
                <div className="row">
                    <div className="col-12" id="inner">
                        <form id="RegisterForm" ref={myFormData} onSubmit={SubmitForm}>
                            <div className="form-row">
                                <div className="col-12">
                                    <label htmlFor="validationDefault01">User email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="validationDefault01"
                                        name="email"
                                        placeholder="Please enter your email"
                                        required
                                    />
                                    <small className="text-danger">{errorMessages.email}</small>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="validationDefault02">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="validationDefault02"
                                        name="password"
                                        placeholder="Please enter your password"
                                        required
                                    />
                                    <small className="text-danger">{errorMessages.password}</small>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            {loading && (
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                            {errorMessages.general && <div className="alert alert-danger mt-3">{errorMessages.general}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
