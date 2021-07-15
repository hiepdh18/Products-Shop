import React from 'react'

function ProductItem(props) {

    const { imageUrl, Children } = props
    console.log(imageUrl)
    return (
        <div className="product-item">Hiep
            <div
                className="product-cover"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />

            <div className="product-body">{Children}</div>
        </div>
    )
}

export default ProductItem