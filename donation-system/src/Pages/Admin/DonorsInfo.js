import React, { useState, useRef } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import DonorsData from "../DonorsData"
import { Nav, Row, Col, Card, Container, Image } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { AimOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../marker.png'; // Import your marker icon
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Info.css";
import MyDonations from '../Donor/MyDonations';
import donationsData from '../DonationsData';
import donationData from '../donationData';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export function HomeTab() {
    const { donor_id } = useParams();

    const donor = DonorsData.find(donor => donor.donor_id === Number(donor_id));

    const [isMapOpen, setIsMapOpen] = useState(false);

    const containerStyle = {
        width: '70%',
        height: '300px',
        borderRadius: '15px'
    };

    function handleMap() {
        setIsMapOpen(!isMapOpen);
    }

    const mapRef = useRef(null);

    // Create custom marker icon
    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [22, 32], // Adjust the size of your marker icon
    });

    return (
        <Card>
            <h1 className='mt-2'>Donors Information</h1>
            <Container className='text-start ms-3'>
                <Row>
                    <Col md="auto">
                        <Image roundedCircle
                            src="https://i.pinimg.com/564x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"
                            width={100} height={100}
                            alt="profile" />
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <p>First Name: {donor?.first_name}</p>
                    </Col>
                    <Col>
                        <p>Last Name: {donor?.last_name}</p>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md="auto">
                        <p className='mt-1'>Address: {donor?.address}</p>
                    </Col>
                    <Col>
                        <Button
                            type='primary'
                            className='mapBtn'
                            icon={<AimOutlined />}
                            onClick={handleMap}>
                            Map
                        </Button>
                    </Col>
                </Row>
                <Row className={`${isMapOpen ? "map" : "d-none"} mt-2 mb-3 justify-content-center me-2`}>
                    <MapContainer center={donor.location} zoom={13} style={containerStyle} ref={mapRef}>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={donor.location} icon={customMarkerIcon}>
                            <Popup>
                                Donor location
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Row>
            </Container>
        </Card>
    );
}

export function DonationsTab() {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/Donor/DonationsInfo/${id}`);
    }

    const data = donationsData.map((d) => {
        const donation = donationData.find((don) => d.donation_id === don.id);
        return {
            ...d,
            itemName: donation ? donation.itemName : '',
            category: donation ? donation.category : '',
        };
    });

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchText('');
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const generalColumns = [
        {
            title: 'Request Id',
            dataIndex: 'donation_id',
            key: 'donation_id',
            width: '10%',
            filteredValue: filteredInfo.donation_id || null,
            sorter: (a, b) => a.donation_id - b.donation_id,
            sortOrder: sortedInfo.columnKey === 'donation_id' ? sortedInfo.order : null,
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName',
            width: '30%',
            ...getColumnSearchProps('itemName'),
            filteredValue: filteredInfo.itemName || null,
            sortOrder: sortedInfo.columnKey === 'itemName' ? sortedInfo.order : null,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '30%',
            filters: [
                { text: 'Clothing', value: 'Clothing' },
                { text: 'Food', value: 'Food' },
                { text: 'Toys', value: 'Toys' },
                { text: 'Medical Supplies', value: 'Medical Supplies' },
                { text: 'Blood Donations', value: 'Blood Donations' },
                { text: 'School Supplies', value: 'School Supplies' },
            ],
            filterSearch: true,
            filteredValue: filteredInfo.category || null,
            onFilter: (value, record) => record.category.startsWith(value),
            sortOrder: sortedInfo.columnKey === 'category' ? sortedInfo.order : null,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sortOrder: sortedInfo.columnKey === 'quantity' ? sortedInfo.order : null,
        },
        {
            title: 'Details',
            dataIndex: '',
            key: 'x',
            render: (record) => <Button onClick={() => handleRowClick(record.donation_id)}>Details</Button>
        }
    ];
    return (
        <Card>
            <Card.Body>
                <h1>Donations</h1>
                <Button onClick={clearAll} className="mb-3">Clear Filters</Button>
                <Table bordered className="mt-4" columns={generalColumns} dataSource={data} onChange={handleChange} />
            </Card.Body>
        </Card>
    );
}

export function ContactTab() {
    return (
        <Card>
            <Card.Body>
                <h1>Contact</h1>

                <Container className='mt-5'>
                    <Row>
                        <Col>
                            <Row>
                                <Col md="auto">
                                    <MdOutlineEmail />
                                </Col>
                                <Col className='text-start'>
                                    <p>test@gmail.com</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col md="auto">
                                    <FaPhoneAlt />
                                </Col>
                                <Col className='text-start'>
                                    <p>+20 12-000-000  </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

function DonorsInfo() {
    const navigate = useNavigate();
    const { donor_id } = useParams();
    const [activeTab, setActiveTab] = React.useState("");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(`/Admin/DonorsInfo/${donor_id}/${tab}`);
    }

    return (
        <Row className='tab-content m-auto pt-4'>
            <div className='col-auto'>
                <IoMdArrowRoundBack className='backIcon' onClick={() => navigate('/Admin/Donors')} />

            </div>
            <Col >
                <div>

                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => handleTabClick("")}
                                className={activeTab === "" ? "active" : ""}>
                                Active
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => handleTabClick("donations")}
                                className={activeTab === "donations" ? "active" : ""}>
                                Donations
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => handleTabClick("contact")}
                                className={activeTab === "contact" ? "active" : ""}>
                                Contact
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                </div>
                <div>
                    <Outlet />

                </div>
            </Col>
        </Row>
    );
}

export default DonorsInfo;