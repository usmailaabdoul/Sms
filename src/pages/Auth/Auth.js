import React, { Component } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { Form, Button } from 'react-bootstrap';
import img1 from '../../res/img/image1.png'
import img2 from '../../res/img/image3.svg'

import './Auth.scss';

class Auth extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {

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
                <Form.Label className='lable'>Email address</Form.Label>
                <Form.Control type="email" placeholder="you@email.com" className='form' />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className='lable'>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" className='form' />
              </Form.Group>
            </Form>

            <div className='buttonWrapper'>
              <div className='button shadow grow pointer'><p>Login</p></div>
            </div>

            <div className='footerWrapper'>Don't have an account? 
              <span style={{color: '#00b5cc', fontWeight: '500', marginLeft: '10px'}} className= 'pointer'>Sign up</span>
            </div>
          </div>
        </div>

        <div className='authWrappersecond'>
          <div className= 'heading'>
            School Managment Systems
          </div>
          <div>Login in to get started ...</div>
          <div style={{marginTop: '2rem'}}> 
               <img src={img2} alt='onboarding image1' style={{height: '250px', backgroundColor: '#e4e9f0'}}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Auth;
