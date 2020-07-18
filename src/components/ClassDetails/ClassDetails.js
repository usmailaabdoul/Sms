import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import html2pdf from 'html2pdf.js';
import img from '../../res/img/gradImg.png';
import Moment from 'react-moment';

import './ClassDetails.scss';


class ClassDetails extends Component {

  constructor() {
    super();

    this.state = {
      
      students: [],
      loading: 'false',
    }
  }

  componentDidMount() {
    this.getStudents();
  }

  getStudents() {
    const { token } = this.props;

    let url = 'https://schoolman-ub.herokuapp.com/api/admin/students';
    let fetchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    fetch(url, fetchParams)
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        console.log(res)
        this.setState({ course: res });
        const statusCode = res[0];
        const responseJson = res[1];

        if (statusCode === 200) {
          console.log(responseJson)
          this.setState({ students: responseJson.students, loadingCourse: false })
        } else if (statusCode === 401) {
          console.log(responseJson)
          this.setState({ loading: false, students: responseJson })
        } else {
          console.log(responseJson)
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }


  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Staff report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const {students} = this.state;
    return (
      <div >

        <div className='StudentsResults' id="divToPrint">
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
          <div>
            <Table striped responsive>
              <thead style={{ backgroundColor: '#cccccc', color: 'white' }}>
                <tr>
                  <th>S/n</th>
                  <th>Matricule</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Dob</th>
                  <th>Department</th>
                  <th>Faculty</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                </tr>
              </thead>
              <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', }}>
                {students ? students.map((info, rowIndex) => {
                  return (
                    <tr key={rowIndex} style={{ color: '#00000090', fontSize: '.8rem', }}>
                      <td>{info.id}</td>
                      <td>{info.matricule}</td>
                      <td>{info.name}</td>
                      <td>{info.email}</td>
                      <td>{info.dob}</td>
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
            Download results
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

export default connect(mapStateToProps, null)(ClassDetails);
