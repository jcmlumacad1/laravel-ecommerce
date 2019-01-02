import React from 'react'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import EditProductModal from './EditProductModal'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.getActionButtons = this.getActionButtons.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct(product) {
        axios
            .delete('products/' + product.id)
            .then(res => this.props.updateProductList(res.data))
    }

    getActionButtons(product) {
        return (
            <React.Fragment>
                <EditProductModal
                    buttonLabel="Edit"
                    updateProductList={this.props.updateProductList}
                    product={product}
                />
                <Button
                    color="danger"
                    onClick={() => this.deleteProduct(product)}
                >
                    Delete
                </Button>
            </React.Fragment>
        )
    }

    render() {
        const columns = ['name', 'description', 'price']
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((key, i) => (
                            <th key={i}>{key}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map(product => (
                        <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            {columns.map(key => (
                                <td key={key + product.id}>{product[key]}</td>
                            ))}
                            <td>{this.getActionButtons(product)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}
