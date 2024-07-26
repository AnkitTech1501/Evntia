import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { RingLoader } from 'react-spinners';
import './nicepage.css';
import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [companyName, setCompanyName] = useState('');
    const [pmName, setPmName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (page = 1) => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            setLoading(true);

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard?page=${page}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('API Response:', response.data);
                const { events, pm } = response.data.data;

                // Update state with API response
                setUserData(events.data || []);
                setCurrentPage(events.current_page);
                setTotalRows(events.total);

                // Set Company and PM info
                setCompanyName(pm.CompanyName || 'Unknown Company');
                setPmName(pm.PMname || 'Unknown PM');

                setError('');
            } catch (error) {
                setError('Failed to fetch data');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData(currentPage);
    }, [currentPage, navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#38077B',
                color: '#fff',
                fontSize: '16px',
            },
        },
        headRow: {
            style: {
                borderBottom: '2px solid #ddd',
            },
        },
    };

    const columns = [
        {
            name: 'Event Name',
            selector: row => capitalizeWords(row.Eventname),
            sortable: true,
        },
        {
            name: 'Date of Execution',
            selector: row => row.Eventdate,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <a href="#" className="u-border-none u-btn u-button-style u-palette-3-base u-text-body-color u-text-hover-white" style={{ display: 'inline-block' }}>
                        <span className="u-file-icon"><img src="images/5431295.png" alt="View" className="img-fluid" /></span>
                    </a>
                    <a href="#" className="u-border-none u-btn u-button-style u-palette-2-base u-text-body-color u-text-hover-white" style={{ display: 'inline-block' }}>
                        <span className="u-file-icon"><img src="images/8900103.png" alt="Edit" className="img-fluid" /></span>
                    </a>
                    <a href="#" className="u-border-none u-btn u-button-style u-palette-5-base u-text-body-color u-text-hover-white" style={{ display: 'inline-block' }}>
                        <span className="u-file-icon"><img src="images/2337746.png" alt="Delete" className="img-fluid" /></span>
                    </a>
                </div>
            ),
        },
    ];

    function capitalizeWords(string) {
        return string.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    return (
        <div className="u-body u-xl-mode" data-lang="en">
            <header className="bg-light border-bottom py-2">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {/* Logo Section */}
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                            <a href="#" className="navbar-brand">
                                <img
                                    src="images/logo1.png"
                                    alt="Logo"
                                    className="img-fluid"
                                    style={{ maxWidth: '120px' }} // Ensure the logo scales well
                                />
                            </a>
                        </div>

                        {/* Logout Section */}
                        <div className="col-md-10 d-flex justify-content-end align-items-center">
                            <span className="d-none d-md-inline" style={{ color: '#123abc', marginRight: '10px' }}>
                                Logout
                            </span>
                            <img
                                src="images/4033019.png"
                                alt="Logout"
                                className="img-fluid"
                                style={{ maxWidth: '40px', cursor: 'pointer' }}
                                onClick={handleLogout}
                            />
                        </div>
                    </div>

                    {/* Navbar Section */}
                    <nav className="navbar navbar-expand-md" style={{ backgroundColor: '#38077B' }}>
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                                {/* Custom SVG icon */}
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6h16M4 12h16M4 18h16" stroke="#c00707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="Dashboard.html" style={{ color: '#fff' }}>Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="Estimate.html" style={{ color: '#fff' }}>Estimates</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="moreestimate.html" style={{ color: '#fff' }}>Approvals</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="creativeclient.html" style={{ color: '#fff' }}>Creatives</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: '#fff' }}>Feedbacks</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="u-align-center u-clearfix u-section-1" id="sec-0e20">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="u-align-center u-container-style u-grey-10 u-shape-rounded u-similar-container u-container">
                                <div className="u-container-layout">
                                    <h4 className="u-custom-font u-font-serif u-text">Company Name</h4>
                                    <p className="u-text u-text-grey-40">{companyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="u-align-center u-container-style u-grey-10 u-shape-rounded u-similar-container u-container">
                                <div className="u-container-layout">
                                    <h4 className="u-custom-font u-font-serif u-text">PM Name</h4>
                                    <p className="u-text u-text-grey-40">{pmName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DataTable Component */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <RingLoader color="#123abc" />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={userData}
                            customStyles={customStyles}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangePage={handlePageChange}
                            highlightOnHover
                        />
                    )}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
