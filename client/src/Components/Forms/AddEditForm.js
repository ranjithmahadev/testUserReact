import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    userName: '',
    givenName: '',
    surName: '',
    dob: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:9000/v1/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...this.state})
    }).then(response => response.json())
      .then(item => {
        if(item.success && item.user) {
          this.props.addItemToState(item.user)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`http://localhost:9000/v1/user/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.state
      })
    }).then(response => response.json())
      .then(item => {
        if(item.success && item.user) {
          this.props.updateState(item.user[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    if(this.props.item){
      const { id, userName, givenName, surName, dob} = this.props.item
      this.setState({ id, userName, givenName, surName, dob })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="userName">User Name</Label>
          <Input type="text" name="userName" id="userName" required onChange={this.onChange} value={this.state.userName === null ? '' : this.state.userName} />
        </FormGroup>
        <FormGroup>
          <Label for="givenName">Given Name</Label>
          <Input type="text" name="givenName" id="givenName" onChange={this.onChange} value={this.state.givenName === null ? '' : this.state.givenName}  />
        </FormGroup>
        <FormGroup>
          <Label for="surName">Sur Name</Label>
          <Input type="text" name="surName" id="surName" onChange={this.onChange} value={this.state.surName === null ? '' : this.state.surName}  />
        </FormGroup>
        <FormGroup>
          <Label for="dob">DOB</Label>
          <Input type="text" name="dob" id="dob" onChange={this.onChange} value={this.state.dob === null ? '' : this.state.dob}  placeholder="05/Mar/1991" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;