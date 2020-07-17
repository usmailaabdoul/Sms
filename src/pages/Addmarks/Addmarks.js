import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Spinner } from 'react-bootstrap';
import './Addmarks.scss';
import Marksheet from '../../components/Marksheet/Marksheet'

class Addmarks extends Component {

  constructor() {
    super();
    this.state = {
      type: 'add',
      loadingCourse: false,
    }
  }
  render() {
  
    return (
      <div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => this.setState({ type: 'add' })} className='card shadow-4 grow pointer mr5'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Add student marks</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              
            {
                this.state.loadingCourse ?
                  <Spinner animation="border" variant="light" />
                  :
                  <FaRegPlusSquare />
              }
              
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'edit' })} className='card shadow-4 grow pointer ml5'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>edit students marks</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>
        </div>


        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <Marksheet 
                loadingCourse={(loadingCourse) => this.setState({loadingCourse})}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <div>edit information </div>
              :
              null
          }
        </div>
      </div>
    )
  }
}

export default Addmarks;
