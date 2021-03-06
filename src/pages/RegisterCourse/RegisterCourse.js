import React, { Component } from 'react';
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { GiBookshelf } from 'react-icons/gi'

import './RegisterCourse.scss';


class RegisterCourse extends Component {
  constructor() {
    super();
    this.state = {
      departments: [],
      selectedCourses: [],
      selectedDepartment: [],
      obj: [],
      finished: false,
      loading: false,
      loadingCourse: false
    }
  }

  componentDidMount() {
    this.getDepartments()
  }

  selectedCourse = (e) => {
    let code = e.target.value;

    const { selectedCourses, selectedDepartment, obj } = this.state;
    const { courses } = selectedDepartment;

    let newcourse = courses.find((c) => c.code === code);
    console.log(newcourse);
    let newBodyObj = newcourse.code
    let newObj = [...obj, { code: newBodyObj }];
    console.log(newObj);

    let newSelectedCourses = [...selectedCourses, newcourse]
    this.setState({ selectedCourses: newSelectedCourses, obj: newObj })

  }

  selectDepartment = (e) => {
    let name = e.target.value;

    const { departments } = this.state;

    let selectedDepartment = departments.find((c) => c.name === name);

    this.setState({ selectedDepartment });
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

  getDepartments = () => {
    this.setState({ loadingCourse: true })

    const { token } = this.props;

    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/courses/all';
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
          this.setState({ departments: responseJson, loadingCourse: false })
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

    let bodyObj = { codes: obj }
    console.log(bodyObj);
    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/courses/register';
    let fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bodyObj)
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
    const { departments, selectedCourses, finished, loading, loadingCourse, selectedDepartment } = this.state;

    return (
      <div>
        <div style={{ margin: '0rem 3rem' }}>
          <div onClick={() => this.getFees()} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Register your Courses</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              {
                loadingCourse ?
                  <Spinner animation="border" variant="light" />
                  :
                  <GiBookshelf />
              }
            </div>
          </div>
        </div>
        <div style={{ margin: '2rem 1rem 1rem 0rem', padding: '0rem 0rem 2rem 0rem', backgroundColor: '#fff', }}>
          <div style={{ display: 'flex', }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
              <div style={{ flex: '1' }} className='lable'>
                Department
                </div>
              <Form.Group controlId="exampleForm.ControlSelect1"
                style={{ flex: '2', margin: 0 }}>
                <Form.Control onChange={this.selectDepartment} as="select" >
                  <option>select your department</option>
                  {departments.map((course) => {
                    return (
                      <option>{course.name}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 1rem', flex: '1' }}>
              <div style={{ flex: '1' }} className='lable'>
                courses
                </div>
              <Form.Group style={{ flex: 1.5, margin: '4.5rem 1rem' }}>
                <Form.Control onChange={this.selectedCourse} as="select"
                  className='form' >
                  <option>choose courses</option>
                  {selectedDepartment.courses ? selectedDepartment.courses.map((c) => {
                    return (
                      <option>{c.code}</option>
                    )
                  }) : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>

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
                          delete course
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
