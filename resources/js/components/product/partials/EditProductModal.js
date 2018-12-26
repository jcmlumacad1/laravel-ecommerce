import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import axios from 'axios'

class EditProductModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            form: {
                name: this.props.product.name,
                description: this.props.product.description,
                price: this.props.product.price
            }
        }

        this.toggle = this.toggle.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    resetForm() {
        this.setState({
            form: {
                name: '',
                description: '',
                price: ''
            }
        })
    }

    handleInputChange(e) {
        const name = e.target.name
        const newForm = { ...this.state.form }
        newForm[name] = e.target.value
        this.setState({
            form: newForm
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios
            .patch('/products/' + this.props.product.id, this.state.form)
            .then(res => {
                const list = res.data
                this.props.updateProductList(list)
            })
        // this.resetForm()
        this.toggle()
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <React.Fragment>
                <Button color="warning" onClick={this.toggle}>
                    {this.props.buttonLabel}
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>Edit Product</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="product-name">Name</Label>
                                <Input
                                    onChange={this.handleInputChange}
                                    value={this.state.form.name}
                                    name="name"
                                    id="product-name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="product-description">
                                    Description
                                </Label>
                                <Input
                                    onChange={this.handleInputChange}
                                    value={this.state.form.description}
                                    type="textarea"
                                    name="description"
                                    id="product-description"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="product-price">Price</Label>
                                <Input
                                    onChange={this.handleInputChange}
                                    value={this.state.form.price}
                                    type="number"
                                    name="price"
                                    id="product-price"
                                />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditProductModal
