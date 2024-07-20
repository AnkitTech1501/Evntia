import axios from 'axios';
import React, { useRef, useState } from 'react';

export default function Register() {
    const myFormData = useRef(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const SubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(myFormData.current);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await axios.post("http://150.0.0.187:5001/api/login", data);
            setSuccess('Login successful!');
            setError('');
            console.log('Success:', response.data);
        } catch (error) {
            setSuccess('');
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            console.error('Error:', error);
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
                                        type="email"
                                        className="form-control"
                                        id="validationDefault01"
                                        name="email"
                                        placeholder="Please enter your email"
                                        required
                                    />
                                    <small className="text-danger">{error}</small>
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
                                    <small className="text-danger">{error}</small>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-3" type="submit">Login</button>
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
