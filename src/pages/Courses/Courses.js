import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Courses.scss';


class Courses extends Component {

  constructor() {
    super();
    this.state = {
      type: 'add',
      courseName: '',
      departmentName: '',

      editCourseName: '',
      eidtCourseCode: '',
      courseCode: '',
      deleteCourseCode: '',
    }
  }

  departmentName = (e) => this.setState({ departmentName: e.target.value });
  courseName = (e) => this.setState({ courseName: e.target.value });

  courseCode = (e) => this.setState({ courseCode: e.target.value });
  editCourseName = (e) => this.setState({ editCourseName: e.target.value });
  eidtCourseCode = (e) => this.setState({ eidtCourseCode: e.target.value });


  deleteCourseCode = (e) => this.setState({ deleteCourseCode: e.target.value });

  addcourse() {
    const { courseCode } = this.state;
    const { token } = this.props;

    var obj = { code: courseCode };
    console.log(obj)
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/account/student/courses';
    let fetchParams = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
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
          const { token, user } = responseJson;
          console.log(token)
          console.log(user)


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

    return (
      <div>

        <div className='cards'>
          <div onClick={() => this.setState({ type: 'add' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Add a new Course</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              <FaRegPlusSquare />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'edit' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Modify a Course information</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#28A745' }} className='cardWrapperIcon'>
              <FaPenFancy />
            </div>
          </div>

          <div onClick={() => this.setState({ type: 'delete' })} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p style={{ textAlign: 'center' }}>Delete a Course</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#DC3445' }} className='cardWrapperIcon'>
              <FaTrashAlt />
            </div>
          </div>

        </div>

        <div style={{ marginTop: '2rem' }}>
          {
            this.state.type === 'add' ?
              <Addcourse
                courseName={(e) => this.courseName(e)}
                addcourse={() => this.addcourse()}
                courseCode={(e) => this.courseCode(e)}
                departmentName={(e) => this.departmentName(e)}
              />
              :
              null
          }

          {
            this.state.type === 'edit' ?
              <Editcourse
              editCourseName={(e) => this.editCourseName(e)}
              eidtCourseCode={(e) => this.eidtCourseCode(e)}
              />
              :
              null
          }

          {
            this.state.type === 'delete' ?
              <Deletecourse
              deleteCourseCode={(e) => this.deleteCourseCode(e)}
              />
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

export default connect(mapStateToProps, null)(Courses);

const Addcourse = (props) => {
  const { courseName, courseCode, departmentName, addcourse } = props;
  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter information</div>
      <div style={{ display: 'flex', }}>
        {/* <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Course name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={courseName}
              type="text"
              placeholder="Course name"
              className='form'
            />
          </Form.Group>
        </div> */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            course code
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={courseCode}
              type="text"
              placeholder="course code"
              className='form'
            />
          </Form.Group>
        </div>

        {/* <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            credits
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={departmentName}
              type="text"
              placeholder="credits"
              className='form'
            />
          </Form.Group>
        </div> */}


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
        <Button onClick={() => addcourse()} variant="primary" type="button">
          Add course
            </Button>
      </div>
    </div>
  )
}

const Editcourse = (props) => {
  const { editCourseName, eidtCourseCode } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Edit Course information</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Course name
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={editCourseName}
              type="text"
              placeholder="Course name"
              className='form'
            />
          </Form.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
          <div style={{ flex: '1' }} className='lable'>
            course code
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={eidtCourseCode}
              type="text"
              placeholder="course code"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            Edit course
            </Button>
        </div>
      </div>
    </div>
  )
}

const Deletecourse = (props) => {
  const { deleteCourseCode } = props;

  return (
    <div style={{ backgroundColor: '#fcfbfb', margin: '2rem 3rem', padding: '2rem' }} className='shadow-5 br3'>
      <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Caution u are about to delete a Course</div>
      <div style={{ display: 'flex', }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
          <div style={{ flex: '1' }} className='lable'>
            Faculty
                </div>
          <Form.Group controlId="exampleForm.ControlSelect1"
            style={{ flex: '2', margin: 0 }}>
            <Form.Control
              onChange={deleteCourseCode}
              type="text"
              placeholder="Faculty name"
              className='form'
            />
          </Form.Group>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
          <Button onClick={() => console.log('hello')} variant="primary" type="button">
            Delete course
            </Button>
        </div>
      </div>
    </div>
  )
}