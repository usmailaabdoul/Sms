import React, { Component } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { Form, Spinner } from 'react-bootstrap';
import img from '../../res/img/image3.svg'

import './Auth.scss';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      matricule: '',
      password: '',
      role: 'admin',
      loading: false,
    }
  }

  matriculeChange = (event) => {
    this.setState({ matricule: event.target.value })
  }

  passwordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  roleChange = (event) => {
    this.setState({ role: event.target.value })
  }

  login = () => {
    this.setState({ loading: true })
    const { matricule, password, role } = this.state;

    if (matricule.length === 0) {
      return this.setState({ loading: false })
    }
    if (password.length === 0) {
      return this.setState({ loading: false })
    }

    console.log('logged in', matricule, password, role);
    this.setState({ loading: false });
    this.props.setRole(role)
    this.props.changeMainRoute('home')
  }

  render() {
    const { loading } = this.state;

    return (
      <div className='authCard'>
        <div className='authWrapperfirst'>
          <div className='logo'>
            <span className='logoIcon'><FaGraduationCap /></span> SchoolMan
          </div>

          <div className='loginWrapper'>
            <p className='loginText'>Log in</p>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className='lable'>Matricule</Form.Label>
                <Form.Control
                  onChange={this.matriculeChange}
                  type="text"
                  placeholder="matricule"
                  className='form'
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <div style={{display: 'flex', alignItems: 'center', margin: '1.5rem 0rem'}}>
                <div style={{flex: '1'}} className='lable'>
                  Select you role
                </div>
                <Form.Group controlId="exampleForm.ControlSelect1" 
                  style={{flex: '2', margin: 0}}>
                  <Form.Control onChange={this.roleChange} as="select" >
                    <option>admin</option>
                    <option>staff</option>
                    <option>student</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className='lable'>Password</Form.Label>
                <Form.Control
                  onChange={this.passwordChange}
                  type="password"
                  placeholder="Enter your password"
                  className='form'
                />
              </Form.Group>
            </Form>

            <div className='buttonWrapper'>
              {
                loading ?
                  <div className='button shadow grow pointer'>
                    <Spinner animation="border" variant="light" />
                  </div>
                  :
                  <div onClick={() => this.login()} className='button shadow grow pointer'>
                    <p>Login</p>
                  </div>
              }
            </div>

            {/* <div className='footerWrapper'>Don't have an account?
              <span style={{ color: '#00b5cc', fontWeight: '500', marginLeft: '10px' }} className='pointer'>Sign up</span>
            </div> */}
          </div>
        </div>

        <div className='authWrappersecond'>
          <div className='heading'>
            School Managment Systems
          </div>
          <div>Log in to get started ...</div>
          <div style={{ marginTop: '2rem' }}>
            <img src={img} alt='onboarding image1' style={{ height: '250px', backgroundColor: '#e4e9f0' }} />
          </div>
        </div>

      </div>
    )
  }
}

export default Auth;
