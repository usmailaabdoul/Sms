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
  FaFileSignature,
  FaSchool
} from "react-icons/fa";
import { GiBookshelf } from 'react-icons/gi'
import { Col, Image } from 'react-bootstrap';
import profileImg from '../../res/img/profileImg.jpg';

import './sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      report: false,
      route: '',
    }
  }

  componentDidUpdate() {
    const {navigationRoute} = this.props;
    if (this.state.route !== navigationRoute) {
      this.setState({route: navigationRoute})
    }
  }

  handleNavColor(id) {
    const { report } = this.state;

    switch (id) {
      case 'Main':
        return this.setState({ route: id, report: false });
      case 'Faculties':
        return this.setState({ route: id, report: false });
      case 'Courses':
        return this.setState({ route: id, report: false });
      case 'Students':
        return this.setState({ route: id, report: false });
      case 'Staff':
        return this.setState({ route: id, report: false });
      case 'Reports':
        return this.setState({ route: id, report: !report });
      case 'Addmarks':
        return this.setState({ route: id, report: !report });
      case 'Fee':
        return this.setState({ route: id, report: !report });
      case 'Results':
        return this.setState({ route: id, report: !report }); 
      default:
        return this.setState({ route: 'Main', report: false });
    }
  }

  handleRoute(route) {
    this.handleNavColor(route)

    this.props.changeRoute(route)
  }

  renderSideBarComponents(role) {
    const { route, report } = this.state;

    if (role === 'admin') {
      return (
        <div>
          <div
            className='pointer'
            onClick={() => {
              this.handleRoute('Main')
            }}
            style={{ color: route === 'Main' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaCog /></span> Main
                </div>
            <div><FaAngleRight /></div>
          </div>

          <div
            className='pointer'
            onClick={() => this.handleRoute('Faculties')}
            style={{ color: route === 'Faculties' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaSchool /></span> Faculties
                  </div>
            <div><FaAngleRight /></div>
          </div>

          <div
            className='pointer'
            onClick={() => this.handleRoute('Courses')}
            style={{ color: route === 'Courses' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><GiBookshelf /></span> Courses
                  </div>
            <div><FaAngleRight /></div>
          </div>

          <div
            className='pointer'
            onClick={() => this.handleRoute('Students')}
            style={{ color: route === 'Students' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaUserGraduate /></span> Students
                  </div>
            <div><FaAngleRight /></div>
          </div>

          <div
            className='pointer'
            onClick={() => this.handleRoute('Staff')}
            style={{ color: route === 'Staff' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaCreativeCommonsBy /></span> Staff
                </div>
            <div><FaAngleRight /></div>
          </div>

          <div>
            <div
              className='pointer'
              onClick={() => {
                this.handleRoute('Reports')
              }}
              style={{ color: route === 'Reports' ? '#00b5cc' : '#000000ad', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ position: 'relative', bottom: 2 }}><FaFileSignature /></span> Reports
                </div>
              {
                report ?
                  <div><FaAngleDown /></div>
                  :
                  <div><FaAngleRight /></div>
              }
            </div>
            <div style={{ marginBottom: '20px' }}>
              {
                report ?
                  <div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      Details of Teaching staff
                      </div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      Details of non Teaching staff
                      </div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      class students details
                      </div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      Students details related admission date
                      </div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      Students details according to names
                      </div>
                    <div className='pointer' style={{ marginLeft: '20px', color: '#000000ad', marginBottom: '10px', borderBottom: '1px solid #ccccccad', marginTop: '5px' }}>
                      Teacher report based on joining date
                      </div>
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
      )
    }

    if (role === 'staff') {
      return (
        <div>
          <div
            className='pointer'
            onClick={() => this.handleRoute('Addmarks')}
            style={{ color: route === 'Addmarks' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaCreativeCommonsBy /></span> Add marks
                </div>
            <div><FaAngleRight /></div>
          </div>
        </div>
      )
    }

    if (role === 'student') {
      return (
        <div>
          <div
            className='pointer'
            onClick={() => this.handleRoute('Fee')}
            style={{ color: route === 'Fee' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaWpforms /></span> Fee
              </div>
            <div><FaAngleRight /></div>
          </div>

          <div
            className='pointer'
            onClick={() => this.handleRoute('Results')}
            style={{ color: route === 'Results' ? '#00b5cc' : '#000000ad', display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div>
              <span style={{ position: 'relative', bottom: 2 }}><FaTable /></span> Results
              </div>
            <div><FaAngleRight /></div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { navigationRoute, showProfileModal, showSettingsModal, showLogoutModal, role } = this.props;
    console.log(navigationRoute)
    return (
      <div>
        <div className="profileWrapper">
          <div style={{ display: 'flex' }}>
            <Col xs={6} md={4}>
              <Image src={profileImg} className='shadow' style={{ borderRadius: '10rem', height: '3rem' }} />
            </Col>
            <div style={{ color: 'white', fontSize: '18px' }}>
              usmaila abdoul
              <span style={{ fontSize: '14px' }}> @{role}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginLeft: '1rem' }}>
            <div
              onClick={() => showSettingsModal()}
              style={{ marginRight: '2rem', padding: '5px 10px', fontSize: '18px', color: 'white', borderRadius: '5px' }}
              className='grow shadow pointer'>
              <FaPowerOff /></div>
            <div
              onClick={() => showProfileModal()}
              style={{ marginRight: '2rem', padding: '5px 10px', fontSize: '18px', color: 'white', borderRadius: '5px' }}
              className='grow shadow pointer'>
              <FaUser /></div>
            <div
              onClick={() => showLogoutModal()}
              style={{ marginRight: '2rem', padding: '5px 10px', fontSize: '18px', color: 'white', borderRadius: '5px' }}
              className='grow shadow pointer'>
              <FaCog /></div>
          </div>
        </div>

        <div style={{ paddingBottom: '5rem' }}>
          <div className="menu shadow-1" style={{ padding: '10px 15px', marginBottom: '10px', fontSize: '20px', color: '#000000cd', borderBottomColor: '#ccc' }}>Menu</div>

          <div style={{ margin: '0px 10px 0px 15px' }}>
            {this.renderSideBarComponents(role)}
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
