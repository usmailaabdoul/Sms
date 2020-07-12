import React, { Component } from 'react';
import { FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { IoMdStats } from 'react-icons/io';
import { connect } from 'react-redux';
import { Form, Button, Table } from 'react-bootstrap';

import './Main.scss';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      course: [],
      faculties: [],
      students: [],
      staffs: [],
      departments: [],
    }
  }

  componentDidMount() {
    const { token } = this.props;

    this.getFaculties(token);
    this.getStudents(token);
    this.getStaff(token);
    this.getDepartments(token);
  }

  getFaculties(token) {//https://everycors.herokuapp.com/
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/faculty';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ faculties: res.Faculties });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  getStudents(token) {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/student';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ students: res.students });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  getStaff(token) {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/staff';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ staffs: res.staff });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  getDepartments(token) {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/department';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log('department', res)
        this.setState({ departments: res.department });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  render() {
    const { students, faculties, staffs, departments } = this.state;
    return (
      <div>

        <div className='cards'>
          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className='title'>Student information</p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p>registered staff</p>
                <p style={{ fontSize: '3rem' }}>{students.length}</p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <IoMdStats />
            </div>
          </div>

          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className='title'>Faculty information</p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p>registered faculties</p>
                <p style={{ fontSize: '3rem' }}>{faculties.length}</p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className='title'>Staff information</p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p>registered staff</p>
                <p style={{ fontSize: '3rem' }}>{staffs.length}</p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#31a2b8' }} className='cardWrapperIcon'>
              <FaBookOpen /> <span style={{ fontSize: '1.4rem', color: '#31a2b8', marginLeft: '-22px' }}><FaSearch /></span>
            </div>
          </div>
        </div>

        <div style={{ margin: '2rem .5rem', display: 'flex' }}>
          <div style={{ flex: 1, width: '25%', height: '10px' }}>
            <StudentTable students={students} />
          </div>
          <div style={{ flex: 1, width: '25%', marginLeft: '.7rem' }}>
            <StaffTable staffs={staffs} />
          </div>
        </div>

        <div style={{ margin: '2rem .5rem', display: 'flex' }}>
          <div style={{ flex: 1, width: '25%', height: '10px' }}>
            <FacultyTable faculties={faculties} />
          </div>
          <div style={{ flex: 1, width: '25%', marginLeft: '.7rem' }}>
            <DepartmentsTable departments={departments} />
          </div>
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

export default connect(mapStateToProps, null)(Main);


const StudentTable = (props) => {
  const { students } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', }} className='shadow-5'>
      <div style={{ backgroundColor: '#3C77F7', padding: '.5rem' }}>
        <h5 style={{ color: '#fff' }}>Students information</h5>
      </div>
      <div style={{ padding: '.25rem' }}>
        <Table striped hover responsive>
          <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', margin: '0' }}>
            <tr>
              <th>S/n</th>
              <th>Matricule</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dob</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Gender</th>
              <th>Marital Status</th>
            </tr>
          </thead>
          <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', fontSize: '.8rem' }}>
            {students ? students.map((info, rowIndex) => {
              return (
                <tr key={rowIndex} style={{ color: '#00000090' }}>
                  <td>{info.id}</td>
                  <td>{info.matricule}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>{info.dob}</td>
                  <td>{info.department}</td>
                  <td>{info.faculty}</td>
                  <td>{info.gender}</td>
                  <td>{info.marital_status}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const StaffTable = (props) => {
  const { staffs } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', }} className='shadow-5'>
      <div style={{ backgroundColor: '#31a2b8', padding: '.5rem' }}>
        <h5 style={{ color: '#fff' }}>Staff information</h5>
      </div>
      <div style={{ padding: '.25rem' }}>
        <Table striped hover responsive>
          <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', margin: '0' }}>
            <tr>
              <th>S/n</th>
              <th>Matricule</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dob</th>
              <th>Nature of job</th>
              <th>Basic pay</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Gender</th>
              <th>Marital Status</th>
            </tr>
          </thead>
          <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', fontSize: '.8rem' }}>
            {staffs ? staffs.map((info, rowIndex) => {
              return (
                <tr key={rowIndex} style={{ color: '#00000090' }}>
                  <td>{info.id}</td>
                  <td>{info.matricule}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>{info.dob}</td>
                  <td>{info.nature_of_job}</td>
                  <td>{info.basic_pay}</td>
                  <td>{info.department}</td>
                  <td>{info.faculty}</td>
                  <td>{info.gender}</td>
                  <td>{info.marital_status}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
}


const FacultyTable = (props) => {
  const { faculties } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', }} className='shadow-5'>
      <div style={{ backgroundColor: '#28A745', padding: '.5rem' }}>
        <h5 style={{ color: '#fff' }}>Faculty information</h5>
      </div>
      <div style={{ padding: '.25rem' }}>
        <Table striped hover responsive>
          <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', margin: '0' }}>
            <tr>
              <th>S/n</th>
              <th>name</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Deleted at</th>
            </tr>
          </thead>
          <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', fontSize: '.8rem' }}>
            {faculties ? faculties.map((info, rowIndex) => {
              return (
                <tr key={rowIndex} style={{ color: '#00000090' }}>
                  <td>{info.id}</td>
                  <td>{info.name}</td>
                  <td>{info.created_at}</td>
                  <td>{info.updated_at}</td>
                  <td>{info.deleted_at}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const DepartmentsTable = (props) => {
  const { departments } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', }} className='shadow-5'>
      <div style={{ backgroundColor: '#bf55ec', padding: '.5rem' }}>
        <h5 style={{ color: '#fff' }}>Department information</h5>
      </div>
      <div style={{ padding: '.25rem' }}>
        <Table striped hover responsive>
          <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', margin: '0' }}>
            <tr>
              <th>S/n</th>
              <th>name</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Deleted at</th>
            </tr>
          </thead>
          <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', fontSize: '.8rem' }}>
            {departments ? departments.map((info, rowIndex) => {
              return (
                <tr key={rowIndex} style={{ color: '#00000090' }}>
                  <td>{info.id}</td>
                  <td>{info.name}</td>
                  <td>{info.created_at}</td>
                  <td>{info.updated_at}</td>
                  <td>{info.deleted_at}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
}