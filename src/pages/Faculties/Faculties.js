import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Faculties.scss';


class Faculties extends Component {
  constructor() {
    super();
    this.state = {
      type: 'add',
      loading: false,
      success: false,
      editsuccess: false,
      deletesuccess: false,

      facultyName: '',
      departmentName: '',

      editfacultyName: '',
      editfacultyid: '',
      facultyId: '',

      deleteFacultyid: '',
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  facultyName = (e) => this.setState({ facultyName: e.target.value });

  editfacultyName = (e) => this.setState({ editfacultyName: e.target.value });
  editfacultyid = (e) => this.setState({ editfacultyid: e.target.value });
  editDepartmentName = (e) => this.setState({ editDepartmentName: e.target.value });

  deleteFacultyid = (e) => this.setState({ deleteFacultyid: e.target.value });

  addFaculty = () => {
    this.setState({ loading: true })
    const { facultyName } = this.state;
    const { token } = this.props;

    var obj = { name: facultyName };
    console.log(obj)
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/faculties';
    let fetchParams = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }
    fetch(url, fetchParams)
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

  editFaculty = () => {
    this.setState({ loading: true })
    const { editfacultyName, editfacultyid } = this.state;

    var obj = { name: editfacultyName };
    var id = editfacultyid;

    const { token } = this.props;
    console.log(obj)
    let url = `https://schoolman-ub.herokuapp.com/api/admin/faculties/${id}`;
    let fetchParams = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }
    fetch(url, fetchParams)
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
    let url = `https://schoolman-ub.herokuapp.com/api/admin/faculties/${id}`;
    let fetchParams = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    fetch(url, fetchParams)
      .then(response => response)
      .then(res => {
        // console.log(res)
        const statusCode = res.status;
        console.log(statusCode)
        if (statusCode === 200) {
          console.log('res', res)
          this.setState({ loading: false, deletesuccess: true, deleteFacultyid: '' });
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  render() {
    console.log(this.state.facultyName);
    const { success, editsuccess, deletesuccess } = this.state;
    return (
      <div>

        <div className='cards'>
          <div onClick={() => this.setState({ type: 'add' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Add a new Faculty</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <FaRegPlusSquare />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'edit' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Modify Faculty information</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'delete' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Delete a Faculties</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#DC3445' }} className='cardWrapperIcon'>
              <FaTrashAlt />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <Addfaculty
                facultyName={(e) => this.facultyName(e)}
                addFaculty={() => this.addFaculty()}
                loading={this.state.loading}
                success={success}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <Editfaculty
                editfacultyName={(e) => this.editfacultyName(e)}
                editFaculty={() => this.editFaculty()}
                editfacultyid={(e) => this.editfacultyid(e)}
                loading={this.state.loading}
                editsuccess={editsuccess}
              />
              :
              null
          }

          {
            this.state.type === 'delete' ?
              <DeleteFaculty
                deleteFacultyid={(e) => this.deleteFacultyid(e)}
                loading={this.state.loading}
                deletesuccess={deletesuccess}
                deleteFaculty={() => this.deleteFaculty()}
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

export default connect(mapStateToProps, null)(Faculties);

const Addfaculty = (props) => {
  const { facultyName, addFaculty, loading, success } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '40%' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '3', margin: 0 }}>
            <Form.Control
              onChange={facultyName}
              type="text"
              placeholder="Faculty name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => addFaculty()} variant="primary" type="button">
                create faculty
            </Button>
          }
        </div>

        {
          success ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
              Faculty Created successfully
          </div>
            : null
        }
      </div>
    </div>
  )
}

const Editfaculty = (props) => {
  const { editfacultyName, editFaculty, editfacultyid, loading, editsuccess } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '40%' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '3', margin: 0 }}>
            <Form.Control
              onChange={editfacultyName}
              type="text"
              placeholder="Edit Faculty name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '20%' }}>
          <div style={{ flex: '1' }} className='lable'>
            Id
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editfacultyid}
              type="text"
              placeholder="id"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => editFaculty()} variant="primary" type="button">
                Edit faculty
            </Button>
          }
        </div>
      </div>
      {
        editsuccess ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '1.2rem' }}>
            Faculty successfully edited
          </div>
          : null
      }
    </div>
  )
}

const DeleteFaculty = (props) => {
  const { deleteFacultyid, deletesuccess, loading, deleteFaculty } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Caution u are about to delete a faculty</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '50%' }}>
          <div style={{ flex: '1' }} className='lable'>
            faculty Id
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={deleteFacultyid}
              type="text"
              placeholder="id"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', }}>
          {
            loading ?
              <Spinner animation="border" variant="info" />
              :
              <Button onClick={() => deleteFaculty()} variant="danger" type="button">
                Delete faculty
            </Button>
          }
        </div>
      </div>
      {
        deletesuccess ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1.2rem' }}>
            Faculty successfully Deleted
          </div>
          : null
      }
    </div>
  )
}