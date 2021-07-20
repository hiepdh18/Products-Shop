import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productApi from '../../../api/productApi'
import './products.css'
import { STATIC_URL } from '../../../constans/constants'
import categoryApi from '../../../api/categoryApi'
import typeApi from '../../../api/typeApi'
import Picker from 'react-picker'


function Products() {

    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    let typeId
    let catId

    const getTypes = async () => {
        try {
            const t = await typeApi.getTypes();
            setTypes(t)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const cats = await categoryApi.getCategories(typeId)
            setCategories(cats)
            console.log(categories)

        } catch (error) {

        }
    }

    const getProducts = async () => {
        try {
            const p = await productApi.getProducts(catId, 1)
            setProducts(p)
            console.log(products)
        } catch (error) {

        }
    }
    const typeSelectHandle = (event) => {
        typeId = event.target.value
        getCategories()
    }
    const catSelectHandle =(event) => {
        console.log(event.target.value)
        catId = event.target.value
        getProducts()
    }

    useEffect(() => {
        getTypes()
    }, [])

    // useEffect(() => {
    //     getCategories()
    // }, [])
  

    // useEffect(() => {
    //     getProducts()
    // }, [])



    return (
        <div className="container">
            <select className="browser-default custom-select" onChange={typeSelectHandle} >
                {
                    types.map(type =>(
                        <option key={type._id} value={type._id}>{type.name}</option>
                    ))
                }
            </select>
            <select className="browser-default custom-select" onChange={catSelectHandle}>
                {
                    categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))
                }
            </select>

            <div className="products">
                {
                    products.map(product => (
                        <div className="card" key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <img src={STATIC_URL + product.thumbnail} alt="" />
                            </Link>
                            <div className="box">
                                <h3 title={product.name}>
                                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                                </h3>
                                <h4>{product.price} Đ</h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products