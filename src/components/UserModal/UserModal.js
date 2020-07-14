import React, { Component } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';

class UserModal extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      success: false,
      date: new Date(),

      email: '',
      password: '',
      phoneNumber: '',
      maritalStatus: '',
      matricule: '',
      dob: '',
      name: '',
    }
  }

  email = (e) => this.setState({ email: e.target.value });
  name = (e) => this.setState({ name: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  phoneNumber = (e) => this.setState({ phoneNumber: e.target.value });
  maritalStatus = (e) => this.setState({ maritalStatus: e.target.value });
  matricule = (e) => this.setState({ matricule: e.target.value });
  onDateChange = (e) => this.setState({ dob: e, date: e });


  updateInfo() {
    this.setState({ loading: true })
    const { email, name, password, phoneNumber, maritalStatus, matricule, dob } = this.state;

    const { token } = this.props;
    const { role } = this.props;

    // let proxyurl = "https://cors-anywhere.herokuapp.com/";

    let url = ''
    let obj = {};
    let date = `${dob}`;
    if (role === 'admin') {
      obj = {
        name,
        password,
        phone: phoneNumber,
        marital_status: maritalStatus,
        matricule,
        dob: date,
      }
      url = 'https://schoolman-ub.herokuapp.com/api/admin';
    } else if (role === 'staff') {
      obj = {
        email,
        password,
        phone: phoneNumber,
        marital_status: maritalStatus,
      }
      url = 'https://schoolman-ub.herokuapp.com/api/account/staff';
    } else {
      obj = {
        email,
        password,
        phone: phoneNumber,
        marital_status: maritalStatus,
      }
      url = 'https://schoolman-ub.herokuapp.com/api/account/student';
    }

    console.log(obj);
    let fetchParams = {
      method: 'PUT',
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

  render() {
    const { role } = this.props;

    const { user } = this.props;
    const { loading, success, date } = this.state;

    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body>
          <div>
            Name: {user.name}
          </div>
          <div>
            Role: {role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
            <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
              email
                </div>
            <Form.Group
              style={{ flex: '2', margin: 0 }}>
              <Form.Control
                onChange={this.email}
                type="email"
                placeholder="you@gmail.com"
                className='form'
              />
            </Form.Group>
          </div>
          {role === 'admin' ?
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
              <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
                name
              </div>
              <Form.Group
                style={{ flex: '2', margin: 0 }}>
                <Form.Control
                  onChange={this.name}
                  type="text"
                  placeholder="name"
                  className='form'
                />
              </Form.Group>
            </div>
            : null}
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
            <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
              Password
                </div>
            <Form.Group
              style={{ flex: '2', margin: 0 }}>
              <Form.Control
                onChange={this.password}
                type="password"
                placeholder="Password"
                className='form'
              />
            </Form.Group>
          </div>
          {role === 'admin' ?
            <div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
                <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
                  Matricule
                </div>
                <Form.Group
                  style={{ flex: '2', margin: 0 }}>
                  <Form.Control
                    onChange={this.matricule}
                    type="text"
                    placeholder="Matricule"
                    className='form'
                  />
                </Form.Group>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
                <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
                  date of birth
                </div>
                <div>
                  <DatePicker
                    onChange={this.onDateChange}
                    value={date}
                  />
                </div>
              </div>
            </div>
            :
            null
          }
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
            <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
              phone number
                </div>
            <Form.Group
              style={{ flex: '2', margin: 0 }}>
              <Form.Control
                onChange={this.phoneNumber}
                type="text"
                placeholder=""
                className='form'
              />
            </Form.Group>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
            <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
              Marital status
                </div>
            <Form.Group
              style={{ flex: '2', margin: 0 }}>
              <Form.Control onChange={this.maritalStatus} as="select"
                className='form' >
                <option>select status</option>
                <option>Single</option>
                <option>Married</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', marginTop: '1rem' }}>
            {
              loading ?
                <Spinner animation="border" variant="primary" />
                :
                <Button onClick={() => this.updateInfo()} variant="primary" type="button">
                  Update information
                </Button>
            }
          </div>

          {
            success ?
              <div style={{ color: 'green', fontSize: '1.3rem', marginTop: '1rem' }}>
                updated information successfully
            </div>
              :
              null
          }

          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user, token }) => {

  return {
    user: user.user,
    token: token.token
  }
}

export default connect(mapStateToProps, null)(UserModal);