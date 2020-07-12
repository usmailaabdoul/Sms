import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Departments.scss';


class Departments extends Component {

  constructor() {
    super();
    this.state = {
      type: 'add',
      courseName: '',
      departmentName: '',

      editDepartmentName: '',
      editfacultyName: '',
      facultyName: '',
      departmentId: '',

      success: false,
      loading: false,
      editsuccess: false,
      deletedSuccess: false,
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  facultyName = (e) => this.setState({ facultyName: e.target.value });

  editDepartmentName = (e) => this.setState({ editDepartmentName: e.target.value });
  editfacultyName = (e) => this.setState({ editfacultyName: e.target.value });


  departmentId = (e) => this.setState({ departmentId: e.target.value });

  addDepartment = () => {
    this.setState({ loading: true });
    const { facultyName, departmentName } = this.state;
    const { token } = this.props;

    var obj = {
      name: departmentName,
      faculty: facultyName,
    };

    console.log(obj)
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/department';
    let fetchParams = {
      method: 'post',
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

  editDepartment = () => {
    this.setState({ loading: true })
    const { editfacultyName, editfacultyid } = this.state;

    var obj = { name: editfacultyName };
    var id = editfacultyid;

    const { token } = this.props;
    console.log(obj)
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://schoolman-ub.herokuapp.com/api/admin/faculty/${id}`;
    let fetchParams = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ loading: false, editsuccess: true });
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  deleteFaculty = () => {
    this.setState({ loading: true })
    const { deleteFacultyid } = this.state;

    var id = deleteFacultyid;

    const { token } = this.props;
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://schoolman-ub.herokuapp.com/api/admin/faculty/${id}`;
    let fetchParams = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ loading: false, deletesuccess: true });
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
            <div style={{ flex: 1.5, textAlign: 'center' }} className='cardWrapperTitle'>
              <p>Add a new Departments</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <FaRegPlusSquare />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'edit' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Modify a Departments information</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'delete' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Delete a Departments</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#DC3445' }} className='cardWrapperIcon'>
              <FaTrashAlt />
            </div>
          </div>

        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <AddDepartment
                facultyName={(e) => this.facultyName(e)}
                addDepartment={() => this.addDepartment()}
                departmentName={(e) => this.departmentName(e)}
                loading={this.state.loading}
                success={this.state.success}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <EditDepartment
                editDepartmentName={(e) => this.editDepartmentName(e)}
                editfacultyName={(e) => this.editfacultyName(e)}
                editDepartment={() => this.editDepartment()}
                loading={this.state.loading}
                editsuccess={this.state.editsuccess}
              />
              :
              null
          }

          {
            this.state.type === 'delete' ?
              <DeleteDepartment
                departmentId={(e) => this.departmentId(e)}
                loading={this.state.loading}
                deletedSuccess={this.state.deletedSuccess}
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

export default connect(mapStateToProps, null)(Departments);

const AddDepartment = (props) => {
  const { facultyName, departmentName, addDepartment, success, loading } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={departmentName}
              type="text"
              placeholder="Department name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={facultyName}
              type="text"
              placeholder="Faculty name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => addDepartment()} variant="primary" type="button">
                Add course
            </Button>
          }
        </div>

      </div>
      {
        success ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
            Department successfully added
          </div>
          : null
      }
    </div>
  )
}

const EditDepartment = (props) => {
  const { editDepartmentName, editfacultyName, editDepartment, editsuccess, loading } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit Department information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Department name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editDepartmentName}
              type="text"
              placeholder="Department name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editfacultyName}
              type="text"
              placeholder="Faculty"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => editDepartment()} variant="primary" type="button">
                Edit course
            </Button>
          }
        </div>
      </div>
      {
        editsuccess ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
            Edited Department details successfully
          </div>
          : null
      }
    </div>
  )
}

const DeleteDepartment = (props) => {
  const { departmentId, loading, deletedSuccess } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Caution u are about to delete a Course</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '50%' }}>
          <div style={{ flex: '1' }} className='lable'>
            Department id
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={departmentId}
              type="text"
              placeholder="department id"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => console.log('hello')} variant="danger" type="button">
                Delete course
            </Button>
          }

        </div>
      </div>
      {
        deletedSuccess ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1.2rem' }}>
            Deleted Department details successfully
          </div>
          : null
      }
    </div>
  )
}