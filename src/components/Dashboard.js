import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import CompanyInfo from './CompanyInfo';
import DataTableComponent from './DataTableComponent';
import EventModal from './EventModal';
import PostEventModal from './PostEventModal'; // Import the PostEventModal component
import { Button } from 'react-bootstrap';
import './nicepage.css';
import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [companyName, setCompanyName] = useState('');
    const [pmName, setPmName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showEventModal, setShowEventModal] = useState(false);
    const [showPostEventModal, setShowPostEventModal] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [clientId, setClientId] = useState('');
    const [compId, setCompId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            setLoading(true);

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const { events, pm } = response.data.data;
                setUserData(events || []);
                setFilteredData(events || []);
                setCompanyName(pm.CompanyName || 'Unknown Company');
                setPmName(pm.PMname || 'Unknown PM');
                setClientId(pm.clientId || ''); // Assuming `ClientId` is available from API
                setCompId(pm.compId || '');     // Assuming `CompId` is available from API
            } catch (error) {
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const filtered = userData.filter(item => 
            item.Eventname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Eventdate.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, userData]);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleShowEventModal = () => setShowEventModal(true);
    const handleCloseEventModal = () => setShowEventModal(false);

    const handleShowPostEventModal = (eventId) => {
        console.log('Received Event ID:', eventId);
        setCurrentEventId(eventId);
        setShowPostEventModal(true);
    };
    const handleClosePostEventModal = () => setShowPostEventModal(false);

    const refreshData = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { events } = response.data.data;
            setUserData(events || []);
            setFilteredData(events || []);
        } catch (error) {
            navigate('/login');
        } finally {
            setLoading(false);
        }
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
            selector: row => row.Eventname,
            width: "200px",
            sortable: true,
        },
        {
            name: 'Date of Execution',
            selector: row => row.Eventdate,
            width: "200px",
            sortable: true,
        },
        {
            name: 'Actions',
            width: "740px",
            cell: row => (
                <div className="d-flex justify-content-space">
                    <a href="#" className="tableAction" title="View">ESTIMATES</a>
                    <a href="#" className="tableAction" title="Edit">CREATIVES</a>
                    <a href="#" className="tableAction" title="Post Event" onClick={() => handleShowPostEventModal(row.EventId)}>POSTEVENT</a>
                </div>
            ),
        }
    ];

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
        <div className="u-body u-xl-mode" data-lang="en">
            <Header />

            <section className="u-align-center u-clearfix u-section-1" id="sec-0e20">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <CompanyInfo companyName={companyName} pmName={pmName} />
                    <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
                    <Button variant="outline-danger" size="lg" onClick={handleShowEventModal}>
                        Add New Event
                    </Button>
                    <EventModal
                        show={showEventModal}
                        handleClose={handleCloseEventModal}
                        clientId={clientId}
                        compId={compId}
                        refreshData={refreshData}
                    />
                    <PostEventModal
                        show={showPostEventModal}
                        handleClose={handleClosePostEventModal}
                        eventId={currentEventId}
                    />
                    <DataTableComponent
                        data={currentItems}
                        columns={columns}
                        loading={loading}
                        pagination={{ customStyles }}
                        paginationServer
                        paginationTotalRows={filteredData.length}
                        handlePageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                    />
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
