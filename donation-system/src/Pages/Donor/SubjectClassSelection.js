import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import LoginData from '../LoginData';
import { useNavigate, useParams } from 'react-router-dom';
//import styles from './SubjectSelection.css';

function ClassAndSubjectSelection() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [subjects, setSubjects] = useState([]); // Array to store selected subjects
  const [numClasses, setNumClasses] = useState(0); // Number of pro-bono classes
  const [numStudents, setNumStudents] = useState(0); // Number of pro-bono students

  const handleSubjectChange = (event) => {
    const isChecked = event.target.checked;
    const subject = event.target.value;

    if (isChecked) {
      setSubjects([...subjects, subject]);
    } else {
      setSubjects(subjects.filter((s) => s !== subject));
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === 'numClasses') {
      setNumClasses(parseInt(value));
    } else if (name === 'numStudents') {
      setNumStudents(parseInt(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginData.forEach((user) => user.username === username ? user.type = 'Teacher' : null)

    // Implement logic to submit selection data (e.g., send to server)
    alert(`Thank you for your willingness to help! You selected: 
      Subjects: ${subjects.join(', ')}
      Number of Pro-bono Classes: ${numClasses}
      Number of Pro-bono Students: ${numStudents}`);
    navigate("/Login")
  };

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center">
      <Container className="py-5">
        <Card style={{ padding: '20px' }} className='text-black m-5' borderRadius='5px'>
          <Card.Body style={{ padding: '20px' }}>
            <h2 className="text-center mb-4">Classes&Subject Selection</h2>

            <Form onSubmit={handleSubmit}>
              {/* Subject Selection */}
              <Form.Group className="text-center ">
                <Form.Label className="text-center">
                  Select Subjects You Can Teach (Choose all that apply):
                </Form.Label>
                <div className="d-flex flex-wrap justify-content-center mb-3">
                  <Form.Check
                    inline
                    type="checkbox"
                    id="subjectMath"
                    value="Math"
                    label="Math"
                    onChange={handleSubjectChange}
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id="subjectScience"
                    value="Science"
                    label="Science"
                    onChange={handleSubjectChange}
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id="subjectEnglish"
                    value="English"
                    label="English"
                    onChange={handleSubjectChange}
                  />
                  {/* Add more checkboxes for other subjects */}
                </div>
              </Form.Group>

              {/* Number of Classes */}
              <Form.Group className="d-flex justify-content-around text-center" >
                <Form.Label>How many Pro-bono Classes can you teach?  </Form.Label >
                <Form.Control
                  className="text-center align-items-center w-25"
                  type="number"
                  min="0"
                  name="numClasses"
                  value={numClasses}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Number of Students */}
              <Form.Group className="d-flex justify-content-around text-center mt-4">
                <Form.Label className="text-center">
                  How many Pro-bono Students can you give private tutoring to?
                </Form.Label>
                <Form.Control className="text-center w-25"
                  type="number"
                  min="0"
                  name="numStudents"
                  value={numStudents}
                  onChange={handleInputChange}
                />
              </Form.Group >

              <Button className="text-center mt-2" type="submit" variant="main-inverse" size="lg" >
                Submit Selection
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default ClassAndSubjectSelection;
