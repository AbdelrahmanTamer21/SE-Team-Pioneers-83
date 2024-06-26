import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { SideBarContext } from './SideBarContext';
import { UserContext } from './UserContext';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import LoginData from '../Pages/LoginData';
const Sidebar = () => {
  const navigate = useNavigate();

  const { userRole,username } = useContext(UserContext);

  const { isOpen } = useContext(SideBarContext);
  const user  = LoginData.find((u)=>u.username===username);

  return (
    <>

      <Nav defaultActiveKey="/home" className={`flex-column sidebar vh-100 h-100 ${isOpen ? 'open' : 'closed'}`} style={{ backgroundColor: '#FFFFFF' }}>
        
        
        <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}`)} className="nav-link">Dashboard</Nav.Link>

        {userRole === 'Admin'?(      
          <>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/Donors`)} className="nav-link">View Donors</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/Organizations`)} className="nav-link">View Organizations</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/Requests`)} className="nav-link">Requests</Nav.Link>

            </>
        ):null}
        {userRole === 'Donor' || userRole === 'x'?(
          <>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/DonationRequests`)} className="nav-link">Donation Requests</Nav.Link>
          </>
        ):null}
        {userRole === 'Donor'?(
          <>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/DonorOrganizations`)} className="nav-link">Organizations</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/MyDonations`)} className="nav-link">My Donations</Nav.Link>      
            {user.don_Type ==='Teacher'?(
               <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/Teaching`)} className="nav-link">Teaching Posts</Nav.Link>
            ):user.don_Type==='Doctor'?(
              <Nav.Link eventKey="link-1" onClick={()=>navigate(`/${userRole}/MedicalCases`)} className="nav-link">Medical Cases</Nav.Link>
            ):null}

          </>
        ):null}
        {userRole === 'Organization' && (
          <>
            <Nav.Link eventKey="link-1" onClick={() => navigate(`/${userRole}/FulfilledPosts`)} className="nav-link">Check Fulfilled Posts</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={() => navigate(`/${userRole}/DonationPosts`)} className="nav-link">Add New Donation Post</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={() => navigate(`/${userRole}/OrgViewDonationRequests`)} className="nav-link">View Donation Requests</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={() => navigate(`/${userRole}/FulfilledPosition`)} className="nav-link">View Fulfilled Postions</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={() => navigate(`/${userRole}/ChoosePickUp`)} className="nav-link">Choose Suitable Time-Slot</Nav.Link>
          </>
        )}
        
        
      </Nav>
    </>
  );
};

export default Sidebar;