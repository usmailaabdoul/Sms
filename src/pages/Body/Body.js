import React, { Component } from 'react';

import Students from '../Students/Students';
import Staff from '../Staff/Staff';
import Fee from '../Fee/Fee';
import Results from '../Results/Results';
import Main from '../Main/Main';

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

    if (route === 'Results') {
      return <Results/>;
    } 

    if (route === 'Main' || route === 'Reports') {
      return <Main/>;
    } 
  }
}

export default Body;
