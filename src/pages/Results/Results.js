import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';

import './Results.scss';


class Results extends Component {

  render() {

    return (
      <div>

        <div className='ml5'>
          <div onClick={() => this.setState({ type: 'payment' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Pay fees</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <FaBookOpen />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'payment' ?
              <MakePayment
              />
              :
              null
          }
        </div>
      </div>
    )
  }
}

export default Results;

const MakePayment = (props) => {
  const {makePayment} = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter students information</div>

      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '47%'}}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty fees/ registration
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={makePayment} as="select"
              className='form' >
                <option>25 000frs</option>
                <option>50 000frs</option>
              </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => console.log('hello')} variant="primary" type="button">
          make payment
            </Button>
      </div>
    </div>
  )
}