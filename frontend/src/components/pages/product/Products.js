import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './products.css'
import { STATIC_URL } from '../../../constans/constants'
import { DataContext } from '../../../contexts/DataContext'

function Products({ page, handle }) {
    const {
        dataState: { types, categories, products },
        loadCategories,
        loadProducts
    } = useContext(DataContext)
    
    let typeId
    let catId

    const typeSelectHandle = (event) => {
        typeId = event.target.value
        loadCategories(typeId)
        console.log(categories)
        console.log(typeId)
    }
    const catSelectHandle = (event) => {
        console.log(event.target.value)
        catId = event.target.value
        loadProducts(catId)
    }

    const handleNextBtn = (e) => {
        handle(page + 1)
    }
    const handlePrevBtn = (e) => {
        handle(page - 1)
    }

    return (
        <div className="container">
            <select className="browser-default custom-select" onChange={typeSelectHandle} >
                {
                    types.map(type => (
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
                            <Link to={`/detail/${product._id}`}>
                                <img src={STATIC_URL + product.thumbnail} alt="" />
                            </Link>
                            <div className="box">
                                <h3 title={product.name}>
                                    <Link to={`/detail/${product._id}`}>{product.name}</Link>
                                </h3>
                                <h4>{product.price} Đ</h4>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div>
                <button
                    disabled={false}
                    onClick={handlePrevBtn}
                >
                    Prev
                </button>
                <button
                    disabled={false}
                    onClick={handleNextBtn}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Products