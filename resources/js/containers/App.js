import React, { Component } from 'react'
import AddProduct from '../components/product/AddProductModal'
import ProductList from '../components/product/ProductList'
import { connect } from 'react-redux'
import { updateProductList } from '../actions/app'

class App extends Component {
    constructor(props) {
        super(props)

        this.updateProductList = this.updateProductList.bind(this)
    }

    componentDidMount() {
        axios.get('/products').then(res => {
            const products = res.data
            this.updateProductList(products)
        })
    }

    updateProductList(products) {
        this.props.updateProductList(products)
    }

    render() {
        return (
            <div>
                <AddProduct
                    updateProductList={this.updateProductList}
                    buttonLabel="Add Product"
                />
                <ProductList
                    products={this.props.products}
                    updateProductList={this.updateProductList}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products
})

const mapDispatchToProps = {
    updateProductList
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
