import React, { Component } from 'react';

import Students from '../Students/Students';
import Staff from '../Staff/Staff';
import Fee from '../Fee/Fee';
import Results from '../Results/Results';
import Main from '../Main/Main';
import Faculties from '../Faculties/Faculties';
import RegisterCourse from '../RegisterCourse/RegisterCourse';
import Courses from '../Courses/Courses';
import Addmarks from '../Addmarks/Addmarks';
import Departments from '../Departments/Departments';

import StaffDetails from '../../components/StaffDetails/StaffDetails'
import StudentsDetails from '../../components/StudentsDetails/StudentsDetails'
import ClassDetails from '../../components/ClassDetails/ClassDetails'
import TeacherDetails from '../../components/TeacherDetails/TeacherDetails'

import './body.scss';

class Body extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const {route} = this.props;
    
    if (route === 'Students') {
      return <Students/>
    } 

    if (route === 'Staff') {
      return <Staff/>;
    }
    
    if (route === 'Fee') {
      return <Fee/>;
    }
    
    if (route === 'Faculties') {
      return <Faculties/>;
    }

    if (route === 'Courses') {
      return <Courses/>;
    }

    if (route === 'RegisterCourse') {
      return <RegisterCourse/>;
    }

    if (route === 'Departments') {
      return <Departments/>;
    }

    if (route === 'Addmarks') {
      return <Addmarks/>;
    }

    if (route === 'Results') {
      return <Results/>;
    } 

    if (route === 'Main') {
      return <Main/>;
    } 
    
    if (route === 'StaffDetails') {
      return <StaffDetails/>;
    } 
    if (route === 'StudentsDetails' ) {
      return <StudentsDetails/>;
    }
    if (route === 'ClassDetails' ) {
      return <ClassDetails/>;
    }
    if (route === '') {
      return null;
    }
  }
}

export default Body;
