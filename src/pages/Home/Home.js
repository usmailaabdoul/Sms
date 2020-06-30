import React, { Component } from 'react';
import { FaListAlt, FaSearch, FaAngleRight } from "react-icons/fa";
import { Navbar, Nav, OverlayTrigger, Popover } from 'react-bootstrap';

import './home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Body from '../Body/Body';
import UserModal from '../../components/UserModal/UserModal';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import LogoutModal from '../../components/LogoutModal/LogoutModal';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      route: 'Main',
      showProfile: false,
      showSettings: false,
      showLogout: false,
    }
  }
  render() {
    const { route, showProfile, showSettings, showLogout } = this.state;

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
            changeRoute={(route) => this.setState({ route })}
            showProfileModal={() => this.setState({ showProfile: true })}
            showSettingsModal={() => this.setState({ showSettings: true })}
            showLogoutModal={() => this.setState({ showLogout: true })}
          />
        </div>

        <div className="content">
          <div className='dashboard shadow'>
            <div className='dashboard-text'>
              Dashboard
            </div>
            <div className='dashboard-nav'>
              Home <FaAngleRight /> Dashboard <FaAngleRight /> {route}
            </div>
          </div>
          <div className='bodyContent'>
            <Body route={route} />
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

export default Home;
