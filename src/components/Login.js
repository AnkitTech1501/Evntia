import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './nicepage.css';
import './Login.css';

const Login = () => {
    const myFormData = useRef(null);
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const SubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(myFormData.current);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
            setSuccess('Login successful!');
            setErrorMessages({ email: '', password: '', general: '' });

            // Save JWT token to sessionStorage
            sessionStorage.setItem('token', response.data.data.token);

            // Redirect to dashboard after login
            navigate('/dashboard');
        } catch (error) {
            setSuccess('');

            if (error.response) {
                const { data } = error.response;

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
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="u-clearfix u-section-1" id="sec-606c">
                <div className="u-container-style u-expanded-width u-group u-group-1">
                    <div className="u-container-layout u-container-layout-1">
                        <img className="u-expanded-height u-image u-image-contain u-image-default u-image-1" src="/images/logo1.png" alt="" />
                    </div>
                </div>
                <img className="u-expanded-width u-image u-image-2" src="/images/Exicon_Event-Desk_Background.png" alt="" />
                <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                    <div className="u-gutter-0 u-layout">
                        <div className="u-layout-row">
                            <div className="u-container-style u-layout-cell u-size-20 u-layout-cell-1">
                                <div className="u-container-layout u-container-layout-2">
                                    <img className="u-align-center-xs u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-image u-image-contain u-image-default u-image-3" src="/images/Exicon_Event-Desk_Left-side-Image.png" alt="" />
                                </div>
                            </div>
                            <div className="u-container-style u-layout-cell u-size-20 u-layout-cell-2">
                                <div className="u-container-layout u-container-layout-3">
                                    <h3 className="u-align-center u-text u-text-white u-text-1">LOGIN</h3>
                                    <h3 className="u-align-center u-text u-text-grey-40 u-text-2">Access your account</h3>
                                    <div className="custom-expanded u-align-center-sm u-align-center-xs u-form u-form-1">
                                        <form ref={myFormData} onSubmit={SubmitForm} className="u-clearfix u-form-spacing-15 u-form-vertical u-inner-form" style={{ padding: '15px' }}>
                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="email" className="u-label">Email</label>
                                                <input type="text" placeholder="Email" id="email" name="email" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-1" required />
                                                <small className="text-danger">{errorMessages.email}</small>
                                            </div>
                                            <div className="u-form-group u-label-none">
                                                <label htmlFor="password" className="u-label">Password</label>
                                                <input type="password" placeholder="Password" id="password" name="password" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-2" required />
                                                <small className="text-danger">{errorMessages.password}</small>
                                            </div>
                                            {/* <div className="u-form-group u-form-submit">
                                                <button type="submit" className="u-btn u-btn-submit u-button-style">{loading ? 'Loading...' : 'Login'}</button>
                                                <div className="u-form-send-message u-form-send-success" style={{ display: success ? 'block' : 'none' }}>
                                                    <p>{success}</p>
                                                </div>
                                                <div className="u-form-send-message u-form-send-error" style={{ display: errorMessages.general ? 'block' : 'none' }}>
                                                    <p>{errorMessages.general}</p>
                                                </div>
                                            </div> */}
                                            <div className="u-align-center u-form-group u-form-submit">
                                                <button type="submit" className="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-gradient u-none u-radius u-text-body-alt-color u-btn-1" disabled={loading}>
                                                    {loading ? 'Logging in...' : 'Login'}
                                                </button>
                                                {loading && (
                                                    <div className="spinner-border text-primary mt-3" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                )}
                                                {success && <div className="alert alert-success mt-3">{success}</div>}
                                                {errorMessages.general && <div className="alert alert-danger mt-3">{errorMessages.general}</div>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
