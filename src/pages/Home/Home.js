import React, { Component } from 'react';
import { FaListAlt, FaSearch, FaAngleRight } from "react-icons/fa";
import { Navbar, Nav, OverlayTrigger, Popover } from 'react-bootstrap';

import './home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Body from '../Body/Body';
import UserModal from '../../components/UserModal/UserModal';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import LogoutModal from '../../components/LogoutModal/LogoutModal';
import Auth from '../Auth/Auth';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      navRoute: '',
      showProfile: false,
      showSettings: false,
      showLogout: false,
      route: 'Login',
      role: 'student'
    }
  }

  componentDidMount() {
    const { role } = this.state;

    if (role === 'admin') {
      this.setState({navRoute: 'Students'});
    }
    if (role === 'student') {
      this.setState({navRoute: 'Fee'});
    }
    if (role === 'staff') {
      this.setState({navRoute: 'Addmarks'});
    }
  }

  render() {
    const { navRoute, route, showProfile, showSettings, showLogout, role } = this.state;

    console.log(navRoute)

    if (route === 'Logi') {
      return <Auth 
        changeMainRoute={(route) => this.setState({route})}
        setRole={(role) => this.setState({role})}
      />
    } else {
      return (
        <div>
          <Navbar fixed="top" collapseOnSelect expand="lg" bg="light" variant="light" className='shadow-1'>
            <Navbar.Brand>
              <div className='name'>
                School Ms
            </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Nav>

                <Nav.Link href="#memes">
                  <div style={{ fontSize: '1.2rem', marginRight: '20px' }}><FaSearch /></div>
                </Nav.Link>

                <OverlayTrigger
                  trigger="click"
                  placement='bottom'
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Title as="h3">{`Popover bottom`}</Popover.Title>
                      <Popover.Content>
                        <strong>Holy guacamole!</strong> Check this info.
                    </Popover.Content>
                    </Popover>
                  }
                >
                  <Nav.Link eventKey={2} href="#deets">
                    <div style={{ fontSize: '1.2rem', marginRight: '20px' }}><FaListAlt /></div>
                  </Nav.Link>
                </OverlayTrigger>


              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="sidebar shadow">
            <Sidebar
              changeRoute={(navRoute) => this.setState({ navRoute })}
              showProfileModal={() => this.setState({ showProfile: true })}
              showSettingsModal={() => this.setState({ showSettings: true })}
              showLogoutModal={() => this.setState({ showLogout: true })}
              role={role}
              navigationRoute={navRoute}
            />
          </div>

          <div className="content">
            <div className='dashboard shadow'>
              <div className='dashboard-text'>
                Dashboard
            </div>
              <div className='dashboard-nav'>
                Home <FaAngleRight /> Dashboard <FaAngleRight /> {navRoute}
              </div>
            </div>
            <div className='bodyContent'>
              <Body route={navRoute} />
            </div>
          </div>

          <UserModal
            show={showProfile}
            onHide={() => this.setState({ showProfile: false })}
          />

          <SettingsModal
            show={showSettings}
            onHide={() => this.setState({ showSettings: false })}
          />

          <LogoutModal
            show={showLogout}
            onHide={() => this.setState({ showLogout: false })}
          />
        </div>
      )
    }
  }
}

export default Home;
