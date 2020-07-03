import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';

import './students.scss';


class Students extends Component {
  constructor() {
    super();
    this.state = {
      type: 'add',

      studentName: '',
      departmentName: '',
      studentMatricule: '',
      facultyName: '',
      maritalStatus: '',
      email: '',
      phoneNumber: '',

      editstudentName: '',
      editdepartmentName: '',
      editstudentMatricule: '',
      editfacultyName: '',
      editmaritalStatus: '',
      editemail: '',
      editphoneNumber: '',

      deleteStudentMatricule: '',
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  studentName = (e) => this.setState({ studentName: e.target.value });
  studentMatricule = (e) => this.setState({ studentMatricule: e.target.value });
  facultyName = (e) => this.setState({ facultyName: e.target.value });
  maritalStatus = (e) => this.setState({ maritalStatus: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  phoneNumber = (e) => this.setState({ phoneNumber: e.target.value });

  editdepartmentName = (e) => this.setState({ editdepartmentName: e.target.value });
  editstudentName = (e) => this.setState({ editstudentName: e.target.value });
  editstudentMatricule = (e) => this.setState({ editstudentMatricule: e.target.value });
  editfacultyName = (e) => this.setState({ editfacultyName: e.target.value });
  editmaritalStatus = (e) => this.setState({ editmaritalStatus: e.target.value });
  editemail = (e) => this.setState({ editemail: e.target.value });
  editphoneNumber = (e) => this.setState({ editphoneNumber: e.target.value });


  deleteStudentMatricule = (e) => this.setState({ deleteStudentMatricule: e.target.value });


  render() {

    return (
      <div>

        <div className='cards'>
          <div onClick={() => this.setState({ type: 'add' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Add a new Student</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <FaRegPlusSquare />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'edit' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Modify a students information</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'delete' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Delete a student</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#DC3445' }} className='cardWrapperIcon'>
              <FaTrashAlt />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <Addstudent
                studentName={(e) => this.studentName(e)}
                studentMatricule={(e) => this.studentMatricule(e)}
                departmentName={(e) => this.departmentName(e)}
                facultyName={(e) => this.facultyName(e)}
                maritalStatus={(e) => this.maritalStatus(e)}
                email={(e) => this.email(e)}
                phoneNumber={(e) => this.phoneNumber(e)}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <Editstudents
                editstudentName={(e) => this.editstudentName(e)}
                editstudentMatricule={(e) => this.editstudentMatricule(e)}
                editdepartmentName={(e) => this.editdepartmentName(e)}
                editfacultyName={(e) => this.editfacultyName(e)}
                editmaritalStatus={(e) => this.editmaritalStatus(e)}
                editemail={(e) => this.editemail(e)}
                editphoneNumber={(e) => this.editphoneNumber(e)}
              />
              :
              null
          }

          {
            this.state.type === 'delete' ?
              <Deletestudents
                deleteStudentMatricule={(e) => this.deleteStudentMatricule(e)}
              />
              :
              null
          }


        </div>
      </div>
    )
  }
}

export default Students;


const Addstudent = (props) => {
  const { studentName, studentMatricule, departmentName, facultyName, maritalStatus, email, phoneNumber } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter students information</div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={studentName}
              type="text"
              placeholder="Name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Matricule
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={studentMatricule}
              type="text"
              placeholder="Matricule"
              className='form'
            />
          </Form.Group>
        </div>
      </div>


      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={facultyName} as="select"
              className='form' >
                <option>Computer</option>
                <option>staff</option>
                <option>student</option>
              </Form.Control>
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={departmentName} as="select"
              className='form' >
                <option>Computer</option>
                <option>staff</option>
                <option>student</option>
              </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          email
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={email}
            type="email"
            placeholder="you@gmail.com"
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          phone number
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={phoneNumber}
            type="text"
            placeholder="+237 "
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          marital status
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={maritalStatus}
            type="email"
            placeholder="status"
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => console.log('hello')} variant="primary" type="button">
          Add student
            </Button>
      </div>
    </div>
  )
}


const Editstudents = (props) => {
  const { editstudentName, editstudentMatricule, editdepartmentName, editfacultyName, editmaritalStatus, editemail, editphoneNumber } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit students information</div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editstudentName}
              type="text"
              placeholder="Name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Matricule
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editstudentMatricule}
              type="text"
              placeholder="Matricule"
              className='form'
            />
          </Form.Group>
        </div>
      </div>


      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={editfacultyName} as="select"
              className='form' >
                <option>Computer</option>
                <option>staff</option>
                <option>student</option>
              </Form.Control>
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editdepartmentName}
              type="text"
              placeholder="Department"
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          email
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={editemail}
            type="email"
            placeholder="you@gmail.com"
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          phone number
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={editphoneNumber}
            type="text"
            placeholder="+237 "
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%' }}>
        <div style={{ flex: '1' }} className='lable'>
          marital status
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={editmaritalStatus}
            type="email"
            placeholder="status"
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => console.log('hello')} variant="primary" type="button">
          Add student
            </Button>
      </div>
    </div>
  )
}


const Deletestudents = (props) => {
  const { deleteStudentMatricule } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Caution you are about to delete a students entire records</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Students matricule
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={deleteStudentMatricule}
              type="text"
              placeholder="Matricule"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            Delete course
            </Button>
        </div>
      </div>
    </div>
  )
}