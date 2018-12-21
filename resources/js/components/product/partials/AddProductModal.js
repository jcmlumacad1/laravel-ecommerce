import React from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap"
import axios from "axios"

class AddProductModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            form: {
                name: "",
                description: "",
                price: ""
            }
        }

        this.toggle = this.toggle.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        axios.post("/products", this.state.form).then((res) => {
            const list = res.data
            this.props.updateProductList(list)
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>
                    {this.props.buttonLabel}
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
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
            </div>
        )
    }
}

export default AddProductModal
