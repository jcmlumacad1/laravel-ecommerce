import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AddProduct from './product/partials/AddProductModal'
import ProductList from './product/partials/ProductList'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }

        this.updateProductList = this.updateProductList.bind(this)
    }

    componentDidMount() {
        axios.get('/products').then(res => {
            const products = res.data
            this.updateProductList(products)
        })
    }

    updateProductList(products) {
        this.setState({
            products
        })
    }

    render() {
        return (
            <div>
                <AddProduct
                    updateProductList={this.updateProductList}
                    buttonLabel="Add Product"
                />
                <ProductList
                    products={this.state.products}
                    updateProductList={this.updateProductList}
                />
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}
