import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import './Staff.scss';


class Staff extends Component {
  constructor() {
    super();
    this.state = {
      type: 'add',
      loading: false,
      success: false,
      date: new Date(),

      name: '',
      departmentId: '',
      matricule: '',
      maritalStatus: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
      job: '',
      salary: '',

      editName: '',
      editdepartmentName: '',
      editMatricule: '',
      editmaritalStatus: '',
      editemail: '',
      editphoneNumber: '',

      deleteStudentMatricule: '',
    }
  }

  departmentId = (e) => this.setState({ departmentId: e.target.value });
  name = (e) => this.setState({ name: e.target.value });
  matricule = (e) => this.setState({ matricule: e.target.value });
  onDateChange = (e) => this.setState({ date: e });
  maritalStatus = (e) => this.setState({ maritalStatus: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  phoneNumber = (e) => this.setState({ phoneNumber: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  genderStatus = (e) => this.setState({ gender: e.target.value });
  job = (e) => this.setState({ job: e.target.value });
  salary = (e) => this.setState({ salary: e.target.value });

  addStaff() {
    this.setState({loading: true});
    const {
      name,
      departmentId,
      matricule,
      date,
      maritalStatus,
      email,
      phoneNumber,
      password,
      gender,
      job,
      salary,
    } = this.state;
    const { token } = this.props;

    var obj = {
      name,
      matricule,
      email,
      password,
      phone: phoneNumber,
      dob: date,
      gender,
      marital_status: maritalStatus,
      department_id: Number(departmentId),
      nature_of_job: job,
      basic_pay: salary,
    };
    console.log(obj)
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/staff';
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

  render() {
    const {loading} = this.state;

    return (
      <div>

        <div className='cards'>
          <div onClick={() => this.setState({ type: 'add' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Add a new student</p>
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
              <p style={{ textAlign: 'center' }}>Delete a students information</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#DC3445' }} className='cardWrapperIcon'>
              <FaTrashAlt />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <AddStaff
                date={this.state.date}
                name={(e) => this.name(e)}
                matricule={(e) => this.matricule(e)}
                departmentId={(e) => this.departmentId(e)}

                onDateChange={(e) => this.onDateChange(e)}

                maritalStatus={(e) => this.maritalStatus(e)}
                email={(e) => this.email(e)}
                phoneNumber={(e) => this.phoneNumber(e)}
                addStaff={() => this.addStaff()}
                password={(e) => this.password(e)}
                genderStatus={(e) => this.genderStatus(e)}
                job={(e) => this.job(e)}
                salary={(e) => this.salary(e)}
                loading={loading}
                success={this.state.success}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <EditStaff
                date={this.state.date}
                name={(e) => this.name(e)}
                matricule={(e) => this.matricule(e)}
                departmentName={(e) => this.departmentName(e)}

                onDateChange={(e) => this.onDateChange(e)}

                maritalStatus={(e) => this.maritalStatus(e)}
                email={(e) => this.email(e)}
                phoneNumber={(e) => this.phoneNumber(e)}

                editStaff={() => this.addStaff()}

                password={(e) => this.password(e)}
                genderStatus={(e) => this.genderStatus(e)}
                job={(e) => this.job(e)}
                salary={(e) => this.salary(e)}
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

export default connect(mapStateToProps, null)(Staff);

const AddStaff = (props) => {
  const { date, success, loading, name, password, job, salary, matricule, departmentId, onDateChange, maritalStatus, email, phoneNumber, addStaff, genderStatus } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter Staff information</div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={name}
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
              onChange={matricule}
              type="text"
              placeholder="Matricule"
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
        <div style={{ flex: '1' }} className='lable'>
          Department id
                </div>
        <Form.Group
          style={{ flex: '2' , margin: 0 }}>
          <Form.Control
            onChange={departmentId}
            type="department"
            placeholder="department id"
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
              <option>select status</option>
              <option>single</option>
              <option>married</option>
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
              <option>select gender</option>
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Nature of job
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={job} as="select"
              className='form' >
              <option>choose</option>
              <option>teaching</option>
              <option>non-teaching</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Basic salary
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={salary}
              type="text"
              placeholder=" "
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        {
          loading ?
            <Spinner animation="border" variant="info" />
            :
            <Button onClick={() => addStaff()} variant="primary" type="button">
              Save
            </Button>
        }
      </div>
      {
        success ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
            successfully registered Staff
          </div>
          : null
      }
    </div>
  )
}


const EditStaff = (props) => {
  const { date, name, password, job, salary, matricule, departmentName, onDateChange, maritalStatus, email, phoneNumber, editStaff, genderStatus } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit Staff information</div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={name}
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
              onChange={matricule}
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

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Nature of job
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={job}
              type="text"
              placeholder=" "
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Basic salary
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={salary}
              type="text"
              placeholder=" "
              className='form'
            />
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => editStaff()} variant="primary" type="button">
          Save
            </Button>
      </div>
    </div>
  )
}