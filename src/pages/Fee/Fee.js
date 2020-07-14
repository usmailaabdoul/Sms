import React, { Component } from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { Form, Button, Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import html2pdf from 'html2pdf.js';

import './Fee.scss';


class Fee extends Component {
  constructor() {
    super();
    this.state = {
      transanctions: [],
      loading: false,
    }
  }

  makePayment = (e) => this.setState({ amount: e.target.value })

  getFees() {
    this.setState({loading: true})
    const { token } = this.props;
    this.setState({ loading: true })
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://schoolman-ub.herokuapp.com/api/account/student/fees';
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
        this.setState({ transanctions: res, loading: false });
      })
      .catch(err => {
        console.log(err)
      }).finally(fin => this.setState({ loading: false }))
  }

  renderTable() {
    const { transanctions } = this.state;

    if (transanctions) {
      return transanctions.map((transanction, rowIndex) => {
        return (
          <tr key={rowIndex} style={{ color: '#00000090', fontSize: '0.8rem' }}>
            <td>{transanction.student_id}</td>
            <td>{transanction.id}</td>
            <td>{transanction.fine}</td>
            <td>{transanction.created_at}</td>
            <td>{transanction.updated_at}</td>
          </tr>
        )
      })
    }
  }


  printDocument() {
    var element = document.getElementById('divToPrint');
    var opt = {
      filename: 'Fees.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, scrollY: 0, scrollX: 0,
      },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'p', }
    };

    html2pdf().from(element).set(opt).save();

  }

  render() {
    const {loading} = this.state;

    return (
      <div>

        <div style={{ margin: '0rem 3rem' }}>
          <div onClick={() => this.getFees()} className='cardWrapper shadow-4 grow pointer'>
            <div style={{ flex: 1.5 }} className='cardWrapperTitle'>
              <p>Transaction details</p>
            </div>
            <div style={{ flex: 1, backgroundColor: '#3C77F7' }} className='cardWrapperIcon'>
              {
                loading ?
                  <Spinner animation="border" variant="light" />
                  :
                  <GiTakeMyMoney />
              }
            </div>
          </div>
        </div>


        <div style={{ marginTop: '2rem' }} id="divToPrint">
          <div style={{ backgroundColor: '#fcfbfb', margin: '1rem 1rem', padding: '1rem' }} className='br2'>

            <div>
              <div style={{ textAlign: 'center', padding: '1rem 0rem' }}>Fees Transaction details</div>
              <Table striped responsive>
                <thead style={{ backgroundColor: '#cccccc', color: 'white', fontSize: '0.8rem' }}>
                  <tr>
                    <th>Student Id</th>
                    <th>Transaction id</th>
                    <th>Amount</th>
                    <th>Created date</th>
                    <th>Updated date</th>
                  </tr>
                </thead>
                <tbody style={{ border: 'solid', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderColor: '#cccccc', }}>
                  {this.renderTable()}
                </tbody>
              </Table>
            </div>

          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem', marginTop: '1rem' }}>
          <Button onClick={() => this.printDocument()} variant="primary" type="button">
            Download details
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

export default connect(mapStateToProps, null)(Fee);