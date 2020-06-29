import React, { Component } from 'react';
import {
  FaCog,
  FaUser,
  FaPowerOff,
  FaAngleRight,
  FaUserGraduate,
  FaCreativeCommonsBy,
  FaTable,
  FaWpforms,
  FaAngleDown,
} from "react-icons/fa";
import { Col, Image, Nav, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import profileImg from '../../res/img/profileImg.jpg';

import './sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      statistic: true,
      studentReport: false,
      staffReport: false,
      forms: false,
      tables: false,
    }
  }

  render() {
    const { statistic, studentReport, staffReport, forms, tables } = this.state;
    return (
      <div>
        <div className="profileWrapper">
          <div style={{ display: 'flex' }}>
            <Col xs={6} md={4}>
              <Image src={profileImg} className='shadow' style={{ borderRadius: '10rem', height: '3rem' }} />
            </Col>
            <div style={{ color: 'white', fontSize: '18px' }}>
              usmaila abdoul
              <span style={{ fontSize: '16px' }}> @admin</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' ,marginTop: '1.5rem', marginLeft: '1rem' }}>
            <div
              style={{ marginRight: '2rem', padding: '5px 7px', fontSize: '18px', color: 'white' }}
              className='grow shadow pointer'>
              <FaPowerOff /></div>
            <div
              style={{ marginRight: '2rem', padding: '5px 7px', fontSize: '18px', color: 'white' }}
              className='grow shadow pointer'>
              <FaUser /></div>
            <div
              style={{ marginRight: '2rem', padding: '5px 7px', fontSize: '18px', color: 'white' }}
              className='grow shadow pointer'>
              <FaCog /></div>
          </div>
        </div>

        <div>
          <div className="menu shadow-1" style={{ padding: '10px 15px', marginBottom: '10px', fontSize: '20px', color: '#000000cd', borderBottomColor: '#ccc' }}>Menu</div>

          <div style={{ margin: '0px 10px 0px 15px' }}>
            <div>
              <div
                className='pointer'
                onClick={() => this.setState({ statistic: !statistic })}
                style={{ color: '#00b5cc', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ position: 'relative', bottom: 2 }}><FaCog /></span> Statistics
                </div>
                {
                  statistic ?
                    <div><FaAngleDown /></div>
                    :
                    <div><FaAngleRight /></div>
                }
              </div>
              <div style={{ marginBottom: '20px' }}>
                {
                  statistic ?
                    <div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Students stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Teacher stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Staff stats
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>

            <div>
              <div
                className='pointer'
                onClick={() => this.setState({ studentReport: !studentReport })}
                style={{ color: '#000000ad', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ position: 'relative', bottom: 2 }}><FaUserGraduate /></span> Students report
                  </div>
                {
                  studentReport ?
                    <div><FaAngleDown /></div>
                    :
                    <div><FaAngleRight /></div>
                }
              </div>
              <div style={{ marginBottom: '20px' }}>
                {
                  studentReport ?
                    <div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Students stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Teacher stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Staff stats
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>

            <div>
              <div
                className='pointer'
                onClick={() => this.setState({ staffReport: !staffReport })}
                style={{ color: '#000000ad', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ position: 'relative', bottom: 2 }}><FaCreativeCommonsBy /></span> Staff report
                </div>
                {
                  staffReport ?
                    <div><FaAngleDown /></div>
                    :
                    <div><FaAngleRight /></div>
                }
              </div>
              <div style={{ marginBottom: '20px' }}>
                {
                  staffReport ?
                    <div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Students stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Teacher stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Staff stats
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>

            <div>
              <div
                className='pointer'
                onClick={() => this.setState({ forms: !forms })}
                style={{ color: '#000000ad', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ position: 'relative', bottom: 2 }}><FaWpforms /></span> Forms
              </div>
                {
                  forms ?
                    <div><FaAngleDown /></div>
                    :
                    <div><FaAngleRight /></div>
                }
              </div>
              <div style={{ marginBottom: '20px' }}>
                {
                  forms ?
                    <div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Students stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Teacher stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Staff stats
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>

            <div>
              <div 
                className='pointer' 
                onClick={() => this.setState({ tables: !tables })}
                style={{ color: '#000000ad', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ position: 'relative', bottom: 2 }}><FaTable /></span> Tables
              </div>
                {
                  tables ?
                    <div><FaAngleDown /></div>
                    :
                    <div><FaAngleRight /></div>
                }
              </div>
              <div style={{ marginBottom: '20px' }}>
                {
                  tables ?
                    <div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Students stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Teacher stats
                      </div>
                      <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                        Staff stats
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
