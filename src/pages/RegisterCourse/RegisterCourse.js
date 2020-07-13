import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';

import './RegisterCourse.scss';


class RegisterCourse extends Component {
  constructor() {
    super();
    this.state = {
      courses: [
        { code: 'CEF440' },
        { code: 'CEF450' },
        { code: 'CEF460' },
      ],
      selectedCourses: [],
      obj: [],
      finished: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.getCourses()
  }

  selectedCourse = (e) => {
    let code = e.target.value;

    const { selectedCourses, courses, obj } = this.state;

    let newcourse = courses.find((c) => c.code === code);
    let newBodyObj = newcourse.code
    let newObj = [...obj, {code: newBodyObj}];

    let newSelectedCourses = [...selectedCourses, newcourse]
    this.setState({ selectedCourses: newSelectedCourses, obj: newObj })

  }

  removeCourse = (code) => {
    const { selectedCourses, obj } = this.state;

    let index = selectedCourses.findIndex((s) => s.code === code);
    if (index > -1) {
      selectedCourses.splice(index, 1);
    }

    let codeindex = obj.findIndex((o) => o.code === code);
    if (codeindex > -1) {
      obj.splice(index, 1);
    }

    this.setState({ selectedCourses, obj })
  }

  getCourses = () => {
    const { token } = this.props;

    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/courses';
    let fetchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    fetch(proxyurl + url, fetchParams)
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
          this.setState({ courses: responseJson })
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

  RegisterCourseCourse() {
    this.setState({ loading: true })

    const { token } = this.props;
    const { obj } = this.state;

    let bodyObj = {codes: obj}
    console.log(bodyObj);
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/courses';
    let fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bodyObj)
    }
    fetch(proxyurl + url, fetchParams)
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
          this.setState({ finished: true, loading: false })
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

  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'FormB.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const { courses, selectedCourses, finished, loading } = this.state;

    return (
      <div style={{ margin: '2rem 1rem 1rem 0rem', padding: '0rem 0rem 2rem 0rem', backgroundColor: '#fff', }}>
        <div style={{ display: 'flex', }}>
          <Form.Group style={{ flex: 1.5, margin: '4.5rem 1rem' }}>
            <Form.Control onChange={this.selectedCourse} as="select"
              className='form' >
              <option>select courses</option>
              {courses.map((c) => {
                return (
                  <option>{c.code}</option>
                )
              })}
            </Form.Control>
          </Form.Group>

          <div style={{ flex: 5, padding: '1rem' }} id="divToPrint">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>Registered Courses</div>
            <Table striped hover responsive>
              <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '.8rem', margin: '0' }}>
                <tr>
                  <th>S/n</th>
                  <th>Course code</th>
                  <th>Course title</th>
                  <th>Credits</th>
                  <th>remove</th>
                </tr>
              </thead>
              <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', fontSize: '.8rem' }}>
                {selectedCourses ? selectedCourses.map((s, rowIndex) => {
                  return (
                    <tr key={rowIndex} style={{ color: '#00000090', fontSize: '0.8rem' }}>
                      <td>{s.id}</td>
                      <td>{s.code}</td>
                      <td>{s.title}</td>
                      <td>{s.credits}</td>
                      <td>
                        <div onClick={() => this.removeCourse(s.code)} style={{ color: 'red' }} className='pointer grow'>
                          remove course
                        </div>
                      </td>
                    </tr>
                  )
                }) : null}
              </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', marginTop: '1rem' }}>
              {
                loading ?
                  <Spinner animation="border" variant="primary" />
                  :
                  <Button onClick={() => this.RegisterCourseCourse()} variant="primary" type="button">
                    Register courses
              </Button>
              }
            </div>
          </div>

        </div>

        <div style={{ marginLeft: '1rem', padding: '0rem 1rem', }}>
          {
            finished ?
              <Button onClick={() => this.printDocument()} variant="primary" type="button">
                Download form B
              </Button>
              :
              null
          }
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

export default connect(mapStateToProps, null)(RegisterCourse);
