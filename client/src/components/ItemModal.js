import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Jumbotron
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        //Add ietm via addItem action
        this.props.addItem(newItem);

        //Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1><span role="img" aria-label="shoppingbags">🛍️</span> Shopping List 
                    <span role="img" aria-label="shoppingbags"> 🛍️</span></h1>
                    <hr/>
                    {this.props.isAuthenticated ?
                        (
                        <div>
                            <h6>Add items to the shopping list</h6>
                            <Button
                                color="dark"
                                style={{marginBottom: '2rem'}}
                                onClick={this.toggle}>
                                    Add Item
                            </Button>
                        </div>) : 
                        (<div>
                            <h6 className="mb-3">Please log in to manage items</h6>
                        </div>)}
                </Jumbotron>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input 
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="Add shopping item"
                                        onChange={this.onChange}/>
                                    <Button
                                        color="dark"
                                        style={{marginTop: '2rem'}}
                                        block>
                                        Add Item
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addItem})(ItemModal);