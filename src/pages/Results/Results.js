import React, { Component } from 'react';
import { FaRegPlusSquare, FaTrashAlt, FaBookOpen, FaPenFancy, FaSearch } from "react-icons/fa";
import { Form, Button, Spinner } from 'react-bootstrap';
import StudentsResults from '../../components/StudentsResults/StudentsResults';
import { connect } from 'react-redux';

import './Results.scss';


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      semester: '',
      results: [],
      year: '',
      loading: false,
      user: props.user
    }
  }

  getSemester = (e) => this.setState({ semester: e.target.value })
  getYear = (e) => this.setState({ year: e.target.value })

  getResults() {
    const { token } = this.props;
    this.setState({ loading: true })
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/results';
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
        this.setState({ results: res.Results, type: 'results', loading: false });
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  render() {
    const { results, loading, semester, user, year } = this.state;
    console.log(user);
    return (
      <div>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ backgroundColor: '#fcfbfb', margin: '1rem 2rem', padding: '0rem' }} className='shadow-5 br1'>
            {/* <div style={{ fontSize: '1.5rem', margin: '0rem 1rem' }}>Enter students information</div> */}

            <div style={{ display: 'flex', }}>
              <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
                <div style={{ flex: '1' }} className='lable'>
                  Year
                </div>
                <Form.Group controlId="exampleForm.ControlSelect1"
                  style={{ flex: '2', margin: 0 }}>
                  <Form.Control onChange={this.getYear} as="select"
                    className='form' >
                    <option>2020/2021</option>
                    <option>2019/2020</option>
                    <option>2018/2019</option>
                    <option>2016/2017</option>
                    <option>2015/2016</option>
                    <option>2013/2014</option>
                    <option>2012/2013</option>
                    <option>2011/2012</option>
                    <option>2010/2011</option>
                    <option>2009/2010</option>
                    <option>2008/2009</option>
                    <option>2007/2008</option>
                    <option>2006/2007</option>
                    <option>2005/2006</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
                <div style={{ flex: '1' }} className='lable'>
                  Semester
                </div>
                <Form.Group controlId="exampleForm.ControlSelect1"
                  style={{ flex: '2', margin: 0 }}>
                  <Form.Control onChange={this.getSemester} as="select"
                    className='form' >
                    <option>first semester</option>
                    <option>second semester</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0rem 1rem', flex: '.5' }}>
              {
                loading ?
                    <Spinner animation="border" variant="info" />
                :
                    <Button onClick={() => this.getResults()} variant="primary" type="button" className='grow'>
                  Get results
                </Button>
              
                }
              </div>
            </div>



            <div style={{ marginTop: '2rem' }}>
              {
                this.state.type === 'results' ?
                  <StudentsResults results={results} semester={semester} user={user} year={year}/>
                  :
                  null

              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ token, user }) => {

  return {
    token: token.token,
    user: user.user
  }
}

export default connect(mapStateToProps, null)(Results);