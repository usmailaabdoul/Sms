import React from 'react';
import {Button, Modal,Form, Spinner} from 'react-bootstrap';

function UserModal(props) {
  const {email, password, maritalStatus, phoneNumber, name, role} = props;

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      
      <Modal.Body>
        <div>
          Name: {name}
        </div>
        <div>
          Role: {role}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
          <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
            email
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={email}
              type="email"
              placeholder="you@gmail.com"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
          <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
            Password
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={password}
              type="text"
              placeholder=""
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', width: '70%' }}>
          <div style={{ flex: '1', marginRight: '1rem' }} className='lable'>
            phone number
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={phoneNumber}
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
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control onChange={maritalStatus} as="select"
              className='form' >
              <option>Single</option>
              <option>Married</option>
            </Form.Control>
          </Form.Group>
        </div>
      {/* </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;