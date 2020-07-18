import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';
import img from '../../res/img/gradImg.png';
import Moment from 'react-moment';

import './StudentsDetails.scss';

class StudentsDetails extends Component {

  constructor() {
    super();

    this.state = {
      students: [],
      loading: 'false',
    }
  }

  componentDidMount() {
    const { token } = this.props;

    this.getStudents(token);
  }

  getStudents(token) {
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/reports?role=student&filter=namewise';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch( url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ students: res.students });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Students Details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a3', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const { students } = this.state;
    return (
      <div >

        <div className='StudentsResults pa1 shadow-5' id="divToPrint">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              border: 'solid',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
              borderColor: '#cccccc',
              padding: '1rem 1rem',
              marginBottom: '2rem'
            }}
          >
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <div className='logo'>
                <span>
                  <img src={img} alt='onboarding image1' className='logoIcon' />
                </span> SchoolMan
          </div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', fontSize: '1.5rem'}}>
            Student report
          </div>
          <div>
            <Table striped responsive>
              <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', }}>
                <tr>
                  <th>S/n</th>
                  <th>Date of admission</th>
                  <th>Matricule</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of birth</th>
                  <th>phone</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                </tr>
              </thead>
              <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', }}>
              {students ? students.map((info, rowIndex) => {
              return (
                <tr key={rowIndex} style={{ color: '#00000090', fontSize: '.8rem', }}>
                  <td>{info.id}</td>
                  <td>{info.doa}</td>
                  <td>{info.matricule}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>{info.dob}</td>
                  <td>{info.phone}</td>
                  <td>{info.gender}</td>
                  <td>{info.marital_status}</td>
                </tr>
              )
            }) : null}
              </tbody>
            </Table>
          </div>
        </div>

        <div style={{ padding: '2rem 2rem', margin: '0rem 0.5rem' }}>
          <Button onClick={() => this.printDocument()} variant="primary" type="button">
            Download report
            </Button>
        </div>


      </div>
    )
  }
}

const mapStateToProps = ({ token }) => {

  return {
    token: token.token
  }
}

export default connect(mapStateToProps, null)(StudentsDetails);