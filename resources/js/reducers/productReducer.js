import { UPDATE_PRODUCT_LIST } from '../actions/types'

const initialState = {
    products: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_LIST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
