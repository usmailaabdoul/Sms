import React, { Component } from 'react';

import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

class Settings extends Component {
  constructor() {
    super();
    this.state = {

      date: new Date(),

      studentName: '',
      departmentId: '',
      studentMatricule: '',
      maritalStatus: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
      studentId: '',

      loading: false,
    }
  }
  departmentId = (e) => this.setState({ departmentId: e.target.value });
  studentName = (e) => this.setState({ studentName: e.target.value });
  studentMatricule = (e) => this.setState({ studentMatricule: e.target.value });
  onDateChange = (e) => this.setState({ date: e });
  maritalStatus = (e) => this.setState({ maritalStatus: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  phoneNumber = (e) => this.setState({ phoneNumber: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  genderStatus = (e) => this.setState({ gender: e.target.value });

  render() {
    const {} = this.props;
    const {date, loading} = this.state;
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body>
          <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter students information</div>

          <div style={{ display: 'flex', }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
              <div style={{ flex: '1' }} className='lable'>
                Name
          </div>
              <Form.Group controlId="exampleForm.ControlSelect1"
                style={{ flex: '2', margin: 0 }}>
                <Form.Control
                  onChange={this.studentName}
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
                  onChange={this.studentMatricule}
                  type="text"
                  placeholder="Matricule"
                  className='form'
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '48%' }}>
            <div style={{ flex: '1' }} className='lable'>
              Department Id
          </div>
            <Form.Group controlId="exampleForm.ControlSelect1"
              style={{ flex: '2', margin: 0 }}>
              <Form.Control
                onChange={this.departmentId}
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
                  onChange={this.email}
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
                  onChange={this.password}
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
                onChange={this.phoneNumber}
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
                onChange={this.onDateChange}
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
                <Form.Control onChange={this.maritalStatus} as="select"
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
                <Form.Control onChange={this.genderStatus} as="select"
                  className='form' >
                  <option>select gender</option>
                  <option>male</option>
                  <option>femail</option>
                  <option>other</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>

            {
              loading ?
                <Spinner animation="border" variant="info" />
                :
                <Button onClick={() => this.addStudent()} variant="primary" type="button">
                  Save
          </Button>
            }
          </div>
        </Modal.Body >
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal >
    );
  }
}

export default Settings;