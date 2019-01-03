import { UPDATE_PRODUCT_LIST } from './types'

export const updateProductList = products => dispatch => {
    dispatch({
        type: UPDATE_PRODUCT_LIST,
        payload: { products }
    })
}
