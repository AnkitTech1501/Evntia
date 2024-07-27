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
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (page = 1, search = '') => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            setLoading(true);

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard`, {
                    page,
                    search,
                }, {
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

        fetchData(currentPage, searchTerm);
    }, [currentPage, searchTerm, navigate]);

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
                <div className="d-flex flex-wrap-column justify-content-center">
                    <a
                        href="#"
                        className="btn btn-primary m-1"
                        title="View"
                        style={{ maxWidth: '60px', minWidth: '32px' }}
                    >
                        <i className="bi bi-eye">test</i>
                    </a>
                    <a
                        href="#"
                        className="btn btn-secondary m-1"
                        title="Edit"
                        style={{ maxWidth: '60px', minWidth: '32px' }}
                    >
                        <i className="bi bi-pencil">test</i>
                    </a>
                    <a
                        href="#"
                        className="btn btn-danger m-1"
                        title="Delete"
                        style={{ maxWidth: '60px', minWidth: '32px' }}
                    >
                        <i className="bi bi-trash">test</i>
                    </a>
                </div>
            ),
        }
    ];

    function capitalizeWords(string) {
        return string.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <div className="u-align-center u-container-style u-grey-10 u-shape-rounded u-similar-container u-container">
                                <div className="u-container-layout">
                                    <h4 className="u-custom-font u-font-serif u-text">Company Name</h4>
                                    <p className="u-text u-text-grey-40">{companyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <div className="u-align-center u-container-style u-grey-10 u-shape-rounded u-similar-container u-container">
                                <div className="u-container-layout">
                                    <h4 className="u-custom-font u-font-serif u-text">PM Name</h4>
                                    <p className="u-text u-text-grey-40">{pmName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* DataTable Component */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <RingLoader color="#123abc" />
                        </div>
                    ) : (
                        <div className="table-responsive">
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
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
