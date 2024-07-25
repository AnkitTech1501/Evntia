import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import './nicepage.css';
import './Dashboard.css'; // Import your CSS file here

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (page = 1) => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            setLoading(true); // Set loading to true before fetching data

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard?page=${page}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('API Response:', response.data);
                setUserData(response.data.data.data || []);
                setCurrentPage(response.data.data.current_page);
                setTotalRows(response.data.data.total); // Set the total rows count
                setError('');
            } catch (error) {
                setError('Failed to fetch data');
                navigate('/login');
            } finally {
                setLoading(false); // Set loading to false after data is fetched
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
                        <span className="u-file-icon"><img src="images/5431295.png" alt="View" /></span>
                    </a>
                    <a href="#" className="u-border-none u-btn u-button-style u-palette-2-base u-text-body-color u-text-hover-white" style={{ display: 'inline-block' }}>
                        <span className="u-file-icon"><img src="images/8900103.png" alt="Edit" /></span>
                    </a>
                    <a href="#" className="u-border-none u-btn u-button-style u-palette-5-base u-text-body-color u-text-hover-white" style={{ display: 'inline-block' }}>
                        <span className="u-file-icon"><img src="images/2337746.png" alt="Delete" /></span>
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
            <header className="u-header u-section-row-container">
                <div className="u-section-rows">
                    <div className="u-section-row u-valign-middle">
                        <div className="data-layout-selected u-clearfix u-layout-wrap u-layout-wrap-1">
                            <div className="u-layout">
                                <div className="u-layout-row">
                                    <div className="u-container-style u-layout-cell u-size-20">
                                        <div className="u-container-layout u-valign-middle-sm u-valign-middle-xs">
                                            <a href="#" className="u-image u-logo u-image-1">
                                                <img src="images/logo1.png" className="u-logo-image u-logo-image-1" alt="Logo" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="u-container-style u-layout-cell u-size-10">
                                        <div className="u-container-layout u-valign-middle">
                                            <p className="u-align-center u-text">
                                                Logout
                                                <span className="u-file-icon" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                                    <img style={{ width: '50px', height: '50px' }} src="images/4033019.png" alt="Logout" />
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="u-clearfix u-custom-color-2 u-section-row">
                        <div className="u-clearfix u-sheet">
                            <nav className="u-menu u-menu-one-level u-offcanvas">
                                <div className="menu-collapse">
                                    <a className="u-button-style u-nav-link" href="#">
                                        <svg viewBox="0 0 24 24">
                                            <rect y="1" width="16" height="2"></rect>
                                            <rect y="7" width="16" height="2"></rect>
                                            <rect y="13" width="16" height="2"></rect>
                                        </svg>
                                    </a>
                                </div>
                                <div className="u-custom-menu u-nav-container">
                                    <ul className="u-nav u-unstyled">
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link" href="Dashboard.html">Dashboard</a></li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link" href="Estimate.html">Estimates</a></li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link" href="moreestimate.html">Approvals</a></li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link" href="creativeclient.html">Creatives</a></li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link" href="#">Feedbacks</a></li>
                                    </ul>
                                </div>
                                <div className="u-custom-menu u-nav-container-collapse">
                                    <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                                        <div className="u-inner-container-layout u-sidenav-overflow">
                                            <div className="u-menu-close"></div>
                                            <ul className="u-align-center u-nav u-popupmenu-items u-unstyled">
                                                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="Dashboard.html">Dashboard</a></li>
                                                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="Estimate.html">Estimates</a></li>
                                                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="moreestimate.html">Approvals</a></li>
                                                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="creativeclient.html">Creatives</a></li>
                                                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="#">Feedbacks</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <section className="u-clearfix u-section-3">
                <div className="u-clearfix u-sheet">
                    <div className="data-layout-selected u-clearfix u-layout-wrap u-palette-5-light-3 u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-align-center u-container-style u-layout-cell u-size-30">
                                    <div className="u-container-layout">
                                        <h4 className="u-text">Company Name : IPCA </h4>
                                    </div>
                                </div>
                                <div className="u-align-center u-container-style u-layout-cell u-size-30">
                                    <div className="u-container-layout">
                                        <h4 className="u-text">PM : Roshan Jha</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="u-expanded-width u-table u-table-responsive u-table-1">
                        <div className="u-table-container">
                        {loading ? (
                            <div className="spinner-container">
                                <RingLoader color="#38077B" />
                            </div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={userData}
                                customStyles={customStyles}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                paginationDefaultPage={currentPage}
                                onChangePage={handlePageChange}
                            />
                        )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
