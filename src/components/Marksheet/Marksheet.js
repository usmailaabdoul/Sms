import React, { Component } from 'react';
import { } from "react-icons/fa";
import { Form, Button, Table } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './Marksheet.scss';


class Marksheet extends Component {

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.state = {
      marks: [
        { Id: 1, Matricule: 'FE17A090', CA: '', Exams: '' },
        { Id: 2, Matricule: 'FE17A091', CA: '', Exams: '' },
        { Id: 3, Matricule: 'FE17A092', CA: '', Exams: '' },
        { Id: 4, Matricule: 'FE17A093', CA: '', Exams: '' },
      ],
      loading: 'false',
    }
  }

  renderTable() {
    const { marks } = this.state;

    return marks.map((mark, rowIndex) => {

      return (
        <tr key={rowIndex}>
          <td>{mark.Id}</td>
          <td>{mark.Matricule}</td>
          <td>
            <Input
              cellIndex={2}
              Id={mark.Id}
              defaultValue={mark.CA}
              onChange={this.onChange}
            />
          </td>
          <td>
            <Input
              cellIndex={3}
              Id={mark.Id}
              defaultValue={mark.Exams}
              onChange={this.onChange}
            />
          </td>
        </tr>
      )
    })
  }

  onChange(event, cellIndex, Id) {

    const { marks } = this.state;

    var newMarks = [...marks]

    var index = newMarks.findIndex(m => m.Id === Id);
    if (index >= 0) {
      if (cellIndex === 2) {
        newMarks[index].CA = event.target.value;
      }
      if (cellIndex === 3) {
        newMarks[index].Exams = event.target.value;
      }

    }

    return this.setState({ marks: newMarks });
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 200, 200);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  render() {

    return (
      <div className='marksheet shadow br3' id="divToPrint">
        <div style={{ display: 'flex', }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: '1' }}>
            <div style={{ flex: '1' }} className='lable'>
              Department
                </div>
            <Form.Group controlId="exampleForm.ControlSelect1"
              style={{ flex: '2', margin: 0 }}>
              <Form.Control onChange={this.roleChange} as="select" >
                <option>Computer</option>
                <option>staff</option>
                <option>student</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1rem', flex: 1 }}>
            <div style={{ flex: '1' }} className='lable'>
              Course
                </div>
            <Form.Group controlId="exampleForm.ControlSelect1"
              style={{ flex: '2', margin: 0 }}>
              <Form.Control onChange={this.roleChange} as="select" >
                <option>Database</option>
                <option>staff</option>
                <option>student</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem 1rem' }}>
            <Button onClick={() => console.log('hello')} variant="primary" type="button">
              Get course
            </Button>
          </div>
        </div>

        <div style={{ margin: '0rem 2rem', fontSize: '1.5rem' }}>
          course name
        </div>
        <div style={{ margin: '1rem 2rem' }}>
          <Table responsive>
            <thead>
              <tr>
                <th>no</th>
                <th>Matricule</th>
                <th>CA/30</th>
                <th>Exams/70</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </Table>
        </div>

        <div style={{ padding: '2rem 2rem'}}>
          <Button onClick={() => this.printDocument()} variant="primary" type="button">
            Download pdf
            </Button>
        </div>


      </div>
    )
  }
}

export default Marksheet;


function Input({ onChange, cellIndex, Id, defaultValue }) {
  const onInputChange = event => {
    onChange(event, cellIndex, Id);
  };

  return (
    <input
      type="text"
      value={defaultValue}
      onChange={onInputChange}
      style={{ borderWidth: '1px', margin: 0, padding: '.5rem 0rem', borderColor: '#cccccc90' }}
    />
  );
}