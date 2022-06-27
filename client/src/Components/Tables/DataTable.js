import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete user forever?')
    if(confirmDelete){
      fetch(`http://localhost:9000/v1/user/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.userName}</td>
          <td>{item.givenName}</td>
          <td>{item.surName}</td>
          <td>{item.dob}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Given Name</th>
            <th>Sur Name</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable;