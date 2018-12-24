import React from 'react'
import { Table } from 'reactstrap'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
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
