import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';
import img from '../../res/img/gradImg.png';

import './StaffDetails.scss';


class StaffDetails extends Component {

  constructor() {
    super();

    this.state = {
      staffs: [],
      loading: 'false',
    }
  }

  componentDidMount() {
    const { token } = this.props;

    this.getStaff(token);
  }

  getStaff(token) {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/staff';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify(obj)
    }
    fetch(proxyurl + url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ staffs: res.staff });

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Results.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a3', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const {staffs} = this.state;
    return (
      <div>

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
            <div style={{ flex: 2, justifyContent: 'flex-start', }}>
              <p style={{ margin: '0' }}>Cameroon</p>
              <p style={{ margin: '0' }}>University of Buea </p>
              <p style={{ margin: '0' }}>The Registrer</p>

            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <div className='logo'>
                <span>
                  <img src={img} alt='onboarding image1' className='logoIcon' />
                </span> SchoolMan
          </div>
            </div>
            <div style={{ flex: 2, justifyContent: 'flex-end', textAlign: 'right', margin: '0', }}>
              <p style={{ margin: '0' }}>Staff Report</p>
              <p style={{ margin: '0' }}>first semester</p>
              <p style={{ margin: '0' }}>year: 2019/2020</p>
              <p style={{ margin: '0' }}>date: today</p>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', fontSize: '1.5rem'}}>
            Staff report
          </div>
          <div>
            <Table striped responsive>
              <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', }}>
                <tr>
                  <th>S/n</th>
                  <th>Matricule</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Dob</th>
                  <th>Nature of job</th>
                  <th>Basic pay</th>
                  <th>Department</th>
                  <th>Faculty</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                </tr>
              </thead>
              <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', }}>
                {staffs ? staffs.map((info, rowIndex) => {
                  return (
                    <tr key={rowIndex} style={{ color: '#00000090', fontSize: '.8rem', }}>
                      <td>{info.id}</td>
                      <td>{info.matricule}</td>
                      <td>{info.name}</td>
                      <td>{info.email}</td>
                      <td>{info.dob}</td>
                      <td>{info.nature_of_job}</td>
                      <td>{info.basic_pay}</td>
                      <td>{info.department}</td>
                      <td>{info.faculty}</td>
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

export default connect(mapStateToProps, null)(StaffDetails);