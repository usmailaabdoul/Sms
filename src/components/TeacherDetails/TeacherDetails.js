import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import img from '../../res/img/gradImg.png';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import './TeacherDetails.scss';


class TeacherDetails extends Component {

  constructor() {
    super();

    this.state = {
      staffs: {},
      loading: false,
      date: ''
    }
  }

  componentDidMount() {
    this.getStaff()
  }
  getStaff() {
    const { token } = this.props;

    let url = 'https://schoolman-ub.herokuapp.com/api/admin/reports?role=staff&filter=datewise';
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
          this.setState({ staffs: responseJson, loading: false })
          this.renderTable()
        } else if (statusCode === 401) {
          console.log(responseJson)
          this.setState({ loading: false })
        } else {
          console.log(responseJson)
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }


  renderTable() {
    const { staffs } = this.state;
    console.log(staffs);

    if (staffs) {
      Object.entries(staffs).map((date, key) => {
        console.log(date)

        return (
          this.setState({ date })
        )
      });
    }
    // return marks.map((mark, rowIndex) => {

    //   return (
    //     <tr key={rowIndex} style={{ color: '#00000090' }}>
    //       <td>{mark.Id}</td>
    //       <td>{mark.courseCode}</td>
    //       <td>{mark.CourseTitle}</td>
    //       <td>{mark.CA}</td>
    //       <td>{mark.Exams}</td>
    //       <td>{mark.finalMark}</td>
    //       <td>{mark.grade}</td>
    //     </tr>
    //   )
    // })
  }

  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Teacher details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const {date} = this.state;
    console.log(date)
    return (
      <div>
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
            <Table striped bordered responsive>
              <thead style={{ backgroundColor: '#cccccc', color: 'white' }}>
                <tr>
                  <th>S/n</th>
                  <th>Date </th>
                  <th>Course title</th>
                  <th>CA/30</th>
                  <th>Exams/70</th>
                  <th>Final mark</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', }}>
                {/* {this.renderTable()} */}
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

export default connect(mapStateToProps, null)(TeacherDetails);
