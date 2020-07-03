import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';

import './Faculties.scss';


class Faculties extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      facultyName: '',
      departmentName: '',

      editDepartmentName: '',
      editFacultyName: '',
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  facultyName = (e) => this.setState({ facultyName: e.target.value });

  editFacultyName = (e) => this.setState({ editFacultyName: e.target.value });
  editDepartmentName = (e) => this.setState({ editDepartmentName: e.target.value });

  render() {
    console.log(this.state.facultyName);
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
                departmentName={(e) => this.departmentName(e)}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <Editfaculty
                editFacultyName={(e) => this.editFacultyName(e)}
                editDepartmentName={(e) => this.editDepartmentName(e)}
              />
              :
              null
          }

          {
            this.state.type === 'delete' ?
              <DeleteFaculty
                deleteFacultyName={(e) => this.deleteFacultyName(e)}
              />
              :
              null
          }

          
        </div>
      </div>
    )
  }
}

export default Faculties;

const Addfaculty = (props) => {
  const { facultyName, departmentName } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
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
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department
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

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            create faculty
            </Button>
        </div>
      </div>
    </div>
  )
}

const Editfaculty = (props) => {
  const { editFacultyName, editDepartmentName } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editFacultyName}
              type="text"
              placeholder="Edit Faculty name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            Department
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editDepartmentName}
              type="text"
              placeholder="Edit Department name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            Edit faculty
            </Button>
        </div>
      </div>
    </div>
  )
}

const DeleteFaculty = (props) => {
  const { deleteFacultyName } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Caution u are about to delete a faculty</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={deleteFacultyName}
              type="text"
              placeholder="Faculty name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            Delete faculty
            </Button>
        </div>
      </div>
    </div>
  )
}