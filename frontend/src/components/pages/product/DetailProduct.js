import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../../../api/productApi'
import ImageSlider from '../../layout/ImageSlider'

function DetailProduct() {
    const [product, setProduct] = useState({})
    const getProduct = async (id) => {
        try {
            setProduct(await productApi.getProduct(id))
        } catch (error) { }
    }

    let { id } = useParams()
    useEffect(() => {
        getProduct(id)
    },[id])

    console.log(product)

    return (
        <div className="container">
            <div className="details" key={product._id}>
                <div className="box-details">
                    <h2 title={product.name}>{product.name}</h2>
                    <h3>{product.price} VND</h3>
                    <p>{product.description}</p>
                </div>
                <div className='slideshow'>
                    {
                        product.slide ?
                            <ImageSlider slides={product.slide} />
                        : <div></div>
                    }
                </div>
            </div>
        </div>

    )
}

export default DetailProduct
