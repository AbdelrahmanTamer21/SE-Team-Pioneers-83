import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";

function ClinicLocation(){
    return(
        <Container fluid>
        <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
          <Card.Body>
            <Row>
              <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Doctor </p>
                <div className="d-flex flex-row align-items-center mb-4">
                  <FaHome className="me-3" size='24'/>
                  <Form.Control type='text' placeholder='Clinic Address' required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <FaCity className="me-3" size='24'/>
                  <Form.Control type='text' placeholder='Clinic Area' required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <RiGovernmentFill className="me-3" size='24'/>
                  <Form.Control type='text' placeholder='Clinic Government' required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <CiLocationOn className="me-3" size='24'/>
                  <Form.Control type='text' placeholder='Google Marker' required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <FaUserDoctor className="me-3" size='24'/>
                  <Form.Control type='text' placeholder='Speciality' required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MdEventAvailable className="me-3" size='24'/>
                  <Form.Control type='number' placeholder='Pro-bono cases' min='1' max='100' required/>
                </div>
                
            
               
                <Button className='mb-4' size='lg'>Submit</Button>
              </Col>
              <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <Card.Img src='https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.jpg?s=612x612&w=0&k=20&c=9AL8Uj9TTtrbHpM78kMp9fqjT_8EqpEekjdixeKUzDw=' fluid />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    )
} export default ClinicLocation