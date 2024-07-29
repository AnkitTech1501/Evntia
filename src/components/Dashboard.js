import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { RingLoader } from 'react-spinners';
import EventModal from './EventModal'; 
import PostEventModal from './PostEventModal';
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
                fontSize: '16px'
            },
        },   
        rows: {
            style: {
            color: 'black',
            backgroundColor: 'white',
            fontSize: '16px'
            },
            highlightOnHoverStyle: {
            color: 'white',
            backgroundColor: '#478AC9',
            },
        },
    };
    const columns = [
        {
            name: 'Event Name',
            selector: row => capitalizeWords(row.Eventname),
            width: "200px",
            sortable: true,
            
        },
        {
            name: 'Date of Execution',
            selector: row => row.Eventdate,
            width:"200px",
            sortable: true,
        },
        {
            name: 'Actions',
            width:"740px",
            cell: row => (
                <div className="d-flex  justify-content-space ">
                    <a
                        href="#"
                        className="tableAction"
                        title="View"
                       
                    >
                        ESTIMATES
                    </a>
                    <a
                        href="#"
                        className="tableAction"
                        title="Edit"
                    >
                        CREATIVES
                    </a>
                    
                    <PostEventModal />
                </div>
            ),
        }
    ];
    const TableData = userData
    console.log(TableData);
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
        <>
        <div className="u-body u-xl-mode" data-lang="en">
            <header className="border-bottom py-2">
                <div className="row align-items-center">
                    {/* Logo Section */}
                    <div className="col-md-4 ml-2 d-flex justify-content-left align-items-center">
                        <a href="#" className="navbar-brand">
                            <img
                                src="images/logo1.png"
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: '75px' }} // Ensure the logo scales well
                            />
                        </a>
                    </div>
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <a className="" title="Facebook" target="_blank" rel="noopener noreferrer" href="https://facebook.com/name">
                            <img className = "img-fluid" src="images/270712024.png" alt="" style = {{'width' : '62px','height' : '55px'}}/>
                        </a>
                        <a className="" title="Twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/name">
                            <img className = "img-fluid" src="images/27072024.png" alt="" style = {{'width' : '60px','height' : '54px'}}/>
                        </a>
                        <a className="" title="Instagram" target="_blank" rel="noopener noreferrer" href="https://instagram.com/name">
                            <img className = "img-fluid" src="images/11820224.png" alt="" style = {{'width' : '50px'}}/> 
                        </a>
                    </div>
                    {/* Logout Section */}
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
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
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            {/* Custom SVG icon */}
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="#c00707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul class = "col-md-1"></ul>
                        <ul className="navbar-nav col-md-8 justify-content-around">
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
            </header>

            <section className="u-align-center u-clearfix u-section-1" id="sec-0e20">
                <div class="u-clearfix u-sheet u-sheet-1">
                    <div class="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-palette-5-light-3 u-layout-wrap-1">
                        <div class="u-gutter-0 u-layout">
                            <div class="u-layout-row">
                                <div class="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                    <div class="u-container-layout u-container-layout-1">
                                        <h4 class="u-text u-text-1">Company Name : {companyName} </h4>
                                    </div>
                                </div>
                                <div class="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                                    <div class="u-container-layout u-container-layout-2">
                                        <h4 class="u-text u-text-2">PM : {pmName}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className = "row mb-4 mt-4 ml-1">
                        
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className = "col-md-6"></div>
                        <div className="col-md-1">
                            <EventModal data = {userData}/>
                        </div>
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
        <div className = "container-fluid mt-4" style = {{backgroundColor:"#333333",height:"250px"}}>
            <p className='text-center text-white p-4 m-5'>Sample text. Click to select the Text Element.</p>
            <p className = 'text-center text-white mt-5'>This site was created by Teams</p>
        </div>
        </>
    );
};
export default Dashboard;