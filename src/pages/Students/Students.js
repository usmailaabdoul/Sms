import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import './students.scss';


class Students extends Component {
  constructor() {
    super();
    this.state = {
      type: 'add',

      date: new Date(),

      studentName: '',
      departmentName: '',
      studentMatricule: '',
      maritalStatus: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',

      editstudentName: '',
      editdepartmentName: '',
      editstudentMatricule: '',
      editfacultyName: '',
      editmaritalStatus: '',
      editemail: '',
      editphoneNumber: '',
      studentId: '',

      deleteStudentMatricule: '',

      loading: false,
      success: false,
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  studentName = (e) => this.setState({ studentName: e.target.value });
  studentMatricule = (e) => this.setState({ studentMatricule: e.target.value });
  onDateChange = (e) => this.setState({ date: e });
  maritalStatus = (e) => this.setState({ maritalStatus: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  phoneNumber = (e) => this.setState({ phoneNumber: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  genderStatus = (e) => this.setState({ gender: e.target.value });

  editdepartmentName = (e) => this.setState({ editdepartmentName: e.target.value });
  editstudentName = (e) => this.setState({ editstudentName: e.target.value });
  editstudentMatricule = (e) => this.setState({ editstudentMatricule: e.target.value });
  editmaritalStatus = (e) => this.setState({ editmaritalStatus: e.target.value });
  editemail = (e) => this.setState({ editemail: e.target.value });
  editphoneNumber = (e) => this.setState({ editphoneNumber: e.target.value });

  studentId = (e) => this.setState({ studentId: e.target.value });


  deleteStudentMatricule = (e) => this.setState({ deleteStudentMatricule: e.target.value });

  addStudent() {
    this.setState({ loading: true })
    const {
      studentName,
      departmentName,
      studentMatricule,
      date,
      maritalStatus,
      email,
      phoneNumber,
      password,
      gender,
    } = this.state;
    const { token } = this.props;

    var obj = {
      name: studentName,
      matricule: studentMatricule,
      email,
      password,
      phone: phoneNumber,
      dob: date,
      gender,
      marital_status: maritalStatus,
      department: departmentName,
    };
    console.log(obj)

    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/student';
    let fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        console.log(res)
        this.setState({ course: res });
        const statusCode = res[0];
        const responseJson = res[1];

        if (statusCode === 200) {
          console.log(responseJson)
          this.setState({ loading: false, success: true })

        } else if (statusCode === 401) {
          console.log(responseJson)
          this.setState({ loading: false })
        } else {
          console.log(responseJson)
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  editStudent() {
    const {
      editstudentName,
      editdepartmentName,
      editstudentMatricule,
      date,
      editmaritalStatus,
      editemail,
      editphoneNumber,
      password,
      gender,
      studentsId,
    } = this.state;
    const { token } = this.props;

    var id = studentsId;
    var obj = {
      name: editstudentName,
      matricule: editstudentMatricule,
      email: editemail,
      password,
      phone: editphoneNumber,
      dob: date,
      gender,
      martital_status: editmaritalStatus,
      department: editdepartmentName,
    };
    console.log(obj)
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://schoolman-ub.herokuapp.com/api/admin/student${id}`;
    let fetchParams = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        console.log(res)
        this.setState({ course: res });
        const statusCode = res[0];
        const responseJson = res[1];

        if (statusCode === 200) {
          console.log(responseJson)


        } else if (statusCode === 401) {
          console.log(responseJson)
          this.setState({ loading: false })
        } else {
          console.log(responseJson)
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

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
                date={this.state.date}
                studentName={(e) => this.studentName(e)}
                studentMatricule={(e) => this.studentMatricule(e)}
                departmentName={(e) => this.departmentName(e)}

                onDateChange={(e) => this.onDateChange(e)}

                maritalStatus={(e) => this.maritalStatus(e)}
                email={(e) => this.email(e)}
                phoneNumber={(e) => this.phoneNumber(e)}
                addStudent={() => this.addStudent()}
                password={(e) => this.password(e)}
                genderStatus={(e) => this.genderStatus(e)}

                loading={this.state.loading}
                success={this.state.success}
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
                editmaritalStatus={(e) => this.editmaritalStatus(e)}
                editemail={(e) => this.editemail(e)}
                editphoneNumber={(e) => this.editphoneNumber(e)}
                password={(e) => this.password(e)}
                genderStatus={(e) => this.genderStatus(e)}
                onDateChange={(e) => this.onDateChange(e)}
                date={this.state.date}
                editStudent={() => this.editStudent()}
                studentId={(e) => this.studentId(e)}
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

const mapStateToProps = ({ token }) => {

  return {
    token: token.token
  }
}

export default connect(mapStateToProps, null)(Students);

const Addstudent = (props) => {
  const { success, loading, date, studentName, password, studentMatricule, departmentName, onDateChange, maritalStatus, email, phoneNumber, addStudent, genderStatus } = props;
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

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
        <div style={{ flex: '1' }} className='lable'>
          Department
                </div>
        <Form.Group controlId="exampleForm.ControlSelect1"
          style={{ flex: '2', margin: 0 }}>
          <Form.Control
            onChange={departmentName}
            type="department"
            placeholder="department"
            className='form'
          />
        </Form.Group>
      </div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Password
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={password}
              type="text"
              placeholder=""
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
        <div style={{ flex: '1' }} className='lable'>
          Date of Birth
                </div>
        <div>
          <DatePicker
            onChange={onDateChange}
            value={date}
          />
        </div>
      </div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            marital status
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={maritalStatus} as="select"
              className='form' >
              <option>select</option>
              <option>Single</option>
              <option>Married</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Gender
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={genderStatus} as="select"
              className='form' >
              <option>select</option>
              <option>Male</option>
              <option>Femail</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>

        {
          loading ?
            <Spinner animation="border" variant="info" />
            :
            <Button onClick={() => addStudent()} variant="primary" type="button">
              Save
                </Button>
        }
      </div>
      {
        success ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
            successfully registered student
          </div>
          : null
      }
    </div>
  )
}


const Editstudents = (props) => {
  const { studentId, password, date, onDateChange, editStudent, genderStatus, editstudentName, editstudentMatricule, editdepartmentName, editmaritalStatus, editemail, editphoneNumber } = props;

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
            students Id
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={studentId}
              type="text"
              placeholder="students Id"
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editdepartmentName}
              type="department"
              placeholder="department"
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
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Password
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={password}
              type="text"
              placeholder=""
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
        <div style={{ flex: '1' }} className='lable'>
          Date of Birth
                </div>
        <div>
          <DatePicker
            onChange={onDateChange}
            value={date}
          />
        </div>
      </div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            marital status
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={editmaritalStatus} as="select"
              className='form' >
              <option>Single</option>
              <option>Married</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Gender
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={genderStatus} as="select"
              className='form' >
              <option>Male</option>
              <option>Femail</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => editStudent()} variant="primary" type="button">
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