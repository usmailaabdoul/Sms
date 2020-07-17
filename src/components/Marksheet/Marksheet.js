import React, { Component } from 'react';
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Marksheet.scss';


class Marksheet extends Component {

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.state = {
      courses: [],
      selectedCourse: '',
      students: [],

      studentMarkSheet: [],
      loading: false,
      success: false,
    }
  }

  componentDidMount() {
    this.getCourses()
  }

  selectedCourse = (e) => {
    const { courses } = this.state;

    this.setState({ selectedCourse: e.target.value })
    let selectedCourse = e.target.value

    let course = courses.filter((c) => c.code === selectedCourse)

    if (course.length > 0) {

      const { students } = course[0];
      this.setState({ students })
    }
  };

  getCourses() {
    this.props.loadingCourse(true)

    const { token } = this.props;

    let url = 'https://schoolman-ub.herokuapp.com/api/account/staff/courses';
    let fetchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // body: JSON.stringify(bodyObj)
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
          this.props.loadingCourse(false)
          this.setState({ loading: false, courses: responseJson })

        } else if (statusCode === 401) {
          console.log(responseJson)
          this.props.loadingCourse(false)
          this.setState({ loading: false })
        } else {
          console.log(responseJson)
          this.props.loadingCourse(false)
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        console.log(err)
        this.props.loadingCourse(false)
      }).finally(fin => this.setState({ loading: false }))
  }

  selectedStudents = (e) => {
    let selectedStudentmatricule = e.target.value;

    const { studentMarkSheet, students, selectedCourse } = this.state;

    let newStudent = students.find((s) => s.matricule === selectedStudentmatricule);
    let { matricule } = newStudent;

    let newStudentSheet = {
      matricule: matricule,
      ca_mark: '',
      exam_mark: '',
      grade: '',
      code: selectedCourse
    };

    let newStudentMarkSheet = [...studentMarkSheet, newStudentSheet]
    this.setState({ studentMarkSheet: newStudentMarkSheet, })

  }

  removeCourse = (matricule) => {
    const { studentMarkSheet } = this.state;

    let index = studentMarkSheet.findIndex((s) => s.matricule === matricule);
    if (index > -1) {
      studentMarkSheet.splice(index, 1);
    }

    this.setState({ studentMarkSheet })
  }

  renderTable(studentMarkSheet) {
    let id = 0
    return studentMarkSheet.map((mark, rowIndex) => {
      id++;
      return (
        <tr key={rowIndex} style={{ fontSize: '0.8rem' }}>
          <td>{id}</td>
          <td>{mark.matricule}</td>
          <td>
            <Input
              cellIndex={2}
              matricule={mark.matricule}
              defaultValue={mark.ca_mark}
              onChange={this.onChange}
            />
          </td>
          <td>
            <Input
              cellIndex={3}
              matricule={mark.matricule}
              defaultValue={mark.exam_mark}
              onChange={this.onChange}
            />
          </td>
          <td>
            {this.computeGrade(mark.ca_mark, mark.exam_mark, mark.matricule)}
          </td>
          <td>
            <div onClick={() => this.removeCourse(mark.matricule)} style={{ color: 'red' }} className='pointer grow'>
              delete student
            </div>
          </td>
        </tr>
      )
    })
  }

  computeGrade(ca, exam, matricule) {
    let sum = Number(ca) + Number(exam);
    let grade = '';

    const { studentMarkSheet } = this.state;

    var newStudentMarkSheet = [...studentMarkSheet]

    var index = newStudentMarkSheet.findIndex(student => student.matricule === matricule);

    if (index >= 0) {

      if (sum >= 0 && sum < 50) { grade = 'F' }
      else if (sum >= 50 && sum < 70) { grade = 'C' }
      else if (sum >= 70 && sum < 80) { grade = 'B' }
      else if (sum >= 80 && sum <= 100) { grade = 'A' }
      else { grade = 'NULL' }

      newStudentMarkSheet[index].grade = grade;
    }
    return grade;

  }

  onChange(event, cellIndex, matricule) {

    const { studentMarkSheet } = this.state;

    var newStudentMarkSheet = [...studentMarkSheet]

    var index = newStudentMarkSheet.findIndex(student => student.matricule === matricule);
    if (index > -1) {
      if (cellIndex === 2) {
        newStudentMarkSheet[index].ca_mark = event.target.value;
      }
      if (cellIndex === 3) {
        newStudentMarkSheet[index].exam_mark = event.target.value;
      }
      if (cellIndex === 4) {
        newStudentMarkSheet[index].grade = event.target.value;
      }

    }

    return this.setState({ studentMarkSheet: newStudentMarkSheet });
  }

  submitMarks() {
    this.setState({ loading: true })

    const { studentMarkSheet } = this.state;
    const { token } = this.props;

    let obj = { marks: studentMarkSheet };
    console.log(obj);
    let url = 'https://schoolman-ub.herokuapp.com/api/account/staff/register/marks';
    let fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
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
          this.setState({ loading: false, success: true })
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

  render() {
    const { courses, studentMarkSheet, students, loading, success } = this.state;

    return (
      <div className='marksheet shadow br3' id="divToPrint">
        <div style={{ display: 'flex', }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
            <div style={{ flex: '1' }} className='lable'>
              Courses
                </div>
            <Form.Group controlId="exampleForm.ControlSelect1"
              style={{ flex: '2', margin: 0 }}>
              <Form.Control onChange={this.selectedCourse} as="select" >
                <option>select courses</option>
                {courses.map((course) => {
                  return (
                    <option>{course.code}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 1rem', flex: '1' }}>
            <div style={{ flex: '1' }} className='lable'>
              students
                </div>
            <Form.Group controlId="exampleForm.ControlSelect1"
              style={{ flex: '2', margin: 0 }}>
              <Form.Control onChange={this.selectedStudents} as="select" >
                <option>select students</option>
                {students.map((student) => {
                  return (
                    <option>{student.matricule}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div style={{ margin: '0rem 2rem', fontSize: '1.5rem', }}>
          Mark Sheet
        </div>
        <div style={{ margin: '1rem 2rem' }}>
          <Table responsive>
            <thead style={{ fontSize: '0.8rem', backgroundColor: '#cccccc90' }}>
              <tr>
                <th>no</th>
                <th>Matricule</th>
                <th>CA/30</th>
                <th>Exams/70</th>
                <th>Grade</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable(studentMarkSheet)}
            </tbody>
          </Table>
        </div>

        <div style={{ padding: '2rem 2rem', display: 'flex'}}>

          {
            loading ?
              <Spinner animation="border" variant="primary" />
              :
              <Button onClick={() => this.submitMarks()} variant="primary" type="button">
                submit marks
            </Button>
          }

          {
            success ?
              <div style={{ color: 'green', fontSize: '1.3rem', marginTop: '1rem', marginLeft: '1rem' }}>
                successfully added students marks
            </div>
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

export default connect(mapStateToProps, null)(Marksheet);

function Input({ onChange, cellIndex, matricule, defaultValue }) {
  const onInputChange = event => {
    onChange(event, cellIndex, matricule);
  };

  return (
    <input
      type="text"
      value={defaultValue}
      onChange={onInputChange}
      style={{ borderWidth: '1px', margin: 0, padding: '.3rem 0rem', borderColor: '#cccccc90' }}
    />
  );
}