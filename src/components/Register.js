import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './nicepage.css';
import './Register.css';

const Register = () => {
    const myFormData = useRef(null);
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        username: '',
        role: '',
        pm: '', // For PM errors
        company: '', // For company errors
        general: ''
    });
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [pm, setPms] = useState([]); // For storing PMs
    const [companies, setCompanies] = useState([]); // For storing companies
    const [selectedRole, setSelectedRole] = useState(''); // To track selected role
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch roles from the API
        const fetchRoles = async () => {
            console.log(`${process.env.REACT_APP_API_URL}/roles`);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/roles`);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        // Fetch PMs and companies if the selected role is 'Client'
        if (selectedRole === '1') { // Assuming '1' is the ID for 'Client'
            const fetchPMs = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/pm`);
                    setPms(response.data);
                } catch (error) {
                    console.error('Error fetching PMs:', error);
                }
            };

            const fetchCompanies = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies`);
                    setCompanies(response.data);
                } catch (error) {
                    console.error('Error fetching companies:', error);
                }
            };

            fetchPMs();
            fetchCompanies();
        } else {
            setPms([]); // Clear PMs if another role is selected
            setCompanies([]); // Clear companies if another role is selected
        }
    }, [selectedRole]);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const SubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(myFormData.current);
        const data = {
            name: formData.get('username'),
            email: formData.get('email'),
            role: parseInt(formData.get('role')),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
            pm: formData.get('pm'), // Include PM in the data
            company: formData.get('company') // Include company in the data
        };

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, data);
            setSuccess('Registration successful!');
            setErrorMessages({ email: '', password: '', password_confirmation: '', username: '', role: '', pm: '', company: '', general: '' });

            // Save JWT token to sessionStorage
            sessionStorage.setItem('token', response.data.data.token);

            // Redirect to dashboard after registration
            navigate('/dashboard');
        } catch (error) {
            setSuccess('');

            if (error.response) {
                const { data } = error.response;

                let newErrors = { email: '', password: '', password_confirmation: '', username: '', role: '', pm: '', company: '', general: '' };

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
                setErrorMessages({ email: '', password: '', password_confirmation: '', username: '', role: '', pm: '', company: '', general: 'No response from server. Please check your network connection.' });
            } else {
                setErrorMessages({ email: '', password: '', password_confirmation: '', username: '', role: '', pm: '', company: '', general: 'An unexpected error occurred.' });
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
                                    <h3 className="u-align-center u-text u-text-white u-text-1">REGISTER</h3>
                                    <h3 className="u-align-center u-text u-text-grey-40 u-text-2">Create an account to get started</h3>
                                    <div className="custom-expanded u-align-center-sm u-align-center-xs u-form u-form-1">
                                        <form ref={myFormData} onSubmit={SubmitForm} className="u-clearfix u-form-spacing-15 u-form-vertical u-inner-form" style={{ padding: '15px' }}>
                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="username" className="u-label">Username</label>
                                                <input type="text" placeholder="Username" id="username" name="username" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-1" required />
                                                <small className="text-danger">{errorMessages.username}</small>
                                            </div>
                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="email" className="u-label">Email</label>
                                                <input type="text" placeholder="Email" id="email" name="email" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-2" required />
                                                <small className="text-danger">{errorMessages.email}</small>
                                            </div>
                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="role" className="u-label">Role</label>
                                                <select id="role" name="role" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-3" required onChange={handleRoleChange}>
                                                    <option value="">Select Role</option>
                                                    {roles.map(role => (
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    ))}
                                                </select>
                                                <small className="text-danger">{errorMessages.role}</small>
                                            </div>
                                            
                                            {/* Conditionally render PM selection field */}
                                            {selectedRole === '1' && (
                                                <>
                                                    <div className="u-form-group u-form-name u-label-none">
                                                        <label htmlFor="pm" className="u-label">Select PM</label>
                                                        <select id="pm" name="pm" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-4">
                                                            <option value="">Select PM</option>
                                                            {pm.map(pm => (
                                                                <option key={pm.PMId} value={pm.PMId}>{pm.PMname}</option>
                                                            ))}
                                                        </select>
                                                        <small className="text-danger">{errorMessages.pm}</small>
                                                    </div>
                                                    <div className="u-form-group u-form-name u-label-none">
                                                        <label htmlFor="company" className="u-label">Select Company</label>
                                                        <select id="company" name="company" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-5">
                                                            <option value="">Select Company</option>
                                                            {companies.map(company => (
                                                                <option key={company.compId} value={company.compId}>{company.clientname}</option>
                                                            ))}
                                                        </select>
                                                        <small className="text-danger">{errorMessages.company}</small>
                                                    </div>
                                                </>
                                            )}

                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="password" className="u-label">Password</label>
                                                <input type="password" placeholder="Password" id="password" name="password" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-6" required />
                                                <small className="text-danger">{errorMessages.password}</small>
                                            </div>
                                            <div className="u-form-group u-form-name u-label-none">
                                                <label htmlFor="password_confirmation" className="u-label">Confirm Password</label>
                                                <input type="password" placeholder="Confirm Password" id="password_confirmation" name="password_confirmation" className="u-grey-15 u-input u-input-rectangle u-radius u-text-grey-40 u-input-7" required />
                                                <small className="text-danger">{errorMessages.password_confirmation}</small>
                                            </div>
                                            {/* <div className="u-align-center u-form-group u-form-submit">
                                                <button type="submit" className="u-active-palette-1-light-2 u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-1-light-1 u-radius-50 u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90 u-white u-btn-1" disabled={loading}>
                                                    Register
                                                </button>
                                            </div> */}
                                            <div className="u-align-center u-form-group u-form-submit">
                                                <button type="submit" className="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-gradient u-none u-radius u-text-body-alt-color u-btn-1" disabled={loading}>
                                                    {loading ? 'Logging in...' : 'Register'}
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
                            <div className="u-container-style u-layout-cell u-size-20 u-layout-cell-3">
                                <div className="u-container-layout u-container-layout-4">
                                    <img className="u-align-center-xs u-align-right-lg u-align-right-md u-align-right-sm u-align-right-xl u-image u-image-contain u-image-default u-image-4" src="/images/Exicon_Event-Desk_Right-side-Image.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
