import { TYPE } from '../constans/constants'
export const dataReducer = (state, action) => {
    const { type, payload: { types, categories, products } } = action
    switch (type) {
        case TYPE.LOAD_TYPES:
            return {
                ...state,
                types
            }
        case TYPE.LOAD_CATEGORIES:
            return {
                ...state,
                categories
            }
        case TYPE.LOAD_PRODUCTS:
            return {
                ...state,
                products
            }
        default:
            return state
    }
}