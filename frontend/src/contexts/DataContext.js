import React, { createContext, useEffect, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import typeApi from '../api/typeApi'
import categoryApi from '../api/categoryApi'
import productApi from '../api/productApi'
import { TYPE } from "../constans/constants";

export const DataContext = createContext()
function DataContextProvider({ children }) {
    const [dataState, dispatch] = useReducer(dataReducer, {
        types: [],
        categories: [],
        products: []
    })

    // function
    const loadTypes = async () => {
        try {
            const data = await typeApi.getTypes()
            dispatch({
                type: TYPE.LOAD_TYPES,
                payload: {
                    types: data
                }
            })
        } catch (error) {

        }
    }
    const loadCategories = async (typeId) => {
        try {
            const data = await categoryApi.getCategories(typeId)
            dispatch({
                type: TYPE.LOAD_CATEGORIES,
                payload: {
                    categories: data
                }
            })
        } catch (error) {

        }
    }
    const loadProducts = async (catId) => {
        try {
            const data = await productApi.getProductsByCat(catId)
            dispatch({
                type: TYPE.LOAD_PRODUCTS,
                payload: {
                    products: data
                }
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        loadTypes()
    }, [])

    const data = { dataState, loadTypes, loadProducts, loadCategories }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
