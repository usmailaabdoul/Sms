import React, { Component } from 'react';
import { FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import {IoMdStats} from 'react-icons/io';

import './Main.scss';


class Main extends Component {

  render() {

    return (
      <div>

        <div className='cards'>
          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className= 'title'>Add a new student</p>
              <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                <p>Number of students registered: <span>1,400</span></p>
                <p>Number of students that have paid: <span>1,400</span></p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <IoMdStats />
            </div>
          </div>

          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className= 'title'>Teachers information</p>
              <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
              <p>Teacher info and stats: <span>400</span></p>
                <p>Strong head teacher: <span>10</span></p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div className='cardWrappermain shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p className= 'title'>Staff information</p>
              <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
              <p>Registred staff: <span>100</span></p>
                <p>Staff staff: <span>20</span></p>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#31a2b8' }} className='cardWrapperIcon'>
              <FaBookOpen /> <span style={{ fontSize: '1.4rem', color: '#31a2b8', marginLeft: '-22px' }}><FaSearch /></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
