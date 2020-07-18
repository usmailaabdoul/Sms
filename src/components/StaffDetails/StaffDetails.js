import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';
import img from '../../res/img/gradImg.png';
import Moment from 'react-moment';

import './StaffDetails.scss';


class StaffDetails extends Component {

  constructor() {
    super();

    this.state = {
      staffs: [],
      nature_of_job: 'teaching',
      loading: false,
      StafftoDisplay: []
    }
  }

  componentDidMount() {
    const { token } = this.props;

    this.getStaff(token);
  }

  // selectednature_of_job = (e) => this.setState({ nature_of_job:  });

  selectednature_of_job = (e) => {
    const nature_of_job = e.target.value;

    this.setState({nature_of_job})
    const { staffs } = this.state;


    if (staffs) {
      let StafftoDisplay = []
      if (nature_of_job === 'teaching') {
        StafftoDisplay = staffs.teaching_staff;
        this.setState({StafftoDisplay})

      } else {
        StafftoDisplay = staffs.non_teaching_staff;
        this.setState({StafftoDisplay})

      }
      console.log(StafftoDisplay)
    }
  }

  getStaff(token) {
    let url = 'https://schoolman-ub.herokuapp.com/api/admin/reports?role=staff&filter=nature_of_job';
    let fetchParams = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }
    fetch(url, fetchParams)
      .then(response => response.json())
      .then(res => {
        console.log(res.teaching_staff)
        this.setState({ staffs: res, StafftoDisplay:  res.teaching_staff});

      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Staff Details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a3', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const { StafftoDisplay, nature_of_job } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 1rem', width: '45%' }}>
          <div style={{ flex: '1' }} className='lable'>
            staff nature of job
                </div>
          <Form.Group style={{ flex: 1.5, margin: '4.5rem 1rem' }}>
            <Form.Control onChange={this.selectednature_of_job} as="select"
              className='form' >
              <option>choose nature of job</option>
              <option>teaching</option>
              <option>non-teaching</option>
            </Form.Control>
          </Form.Group>
        </div>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>
            Staff report {nature_of_job}
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
                {StafftoDisplay ? StafftoDisplay.map((info, rowIndex) => {
                  return (
                    <tr key={rowIndex} style={{ color: '#00000090', fontSize: '.8rem', }}>
                      <td>{info.id}</td>
                      <td>{info.matricule}</td>
                      <td>{info.name}</td>
                      <td>{info.email}</td>
                      <td>{info.doa}</td>
                      <td>{info.faculty}</td>
                      <td>{info.nature_of_job}</td>
                      <td>{info.basic_pay}</td>
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

export default connect(mapStateToProps, null)(StaffDetails);