import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal';
import DataTable from './Components/Tables/DataTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    callAPI() {
        fetch("http://localhost:9000/v1/users")
            .then(res => res.json())
            .then(res => {
                console.log('res %j', res.users)
                this.setState({ items: res.users })
            })
            .catch(err => err);
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
          items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
        // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        console.log('i was cld %j', this.state.items)
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        const users = this.state.items;
        return (
            <Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>User CRUD</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {users && <DataTable items={users} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalForm buttonLabel="Add User" addItemToState={this.addItemToState}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;