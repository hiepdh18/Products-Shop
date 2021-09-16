import React from 'react'
import Product from '../Product'
import data from '../../data'


function HomeScreen() {
  return (
    <div className="row center">
      {
        data.products.map(product => (
          <Product product={product} />
        ))
      }
    </div>
  )
}

export default HomeScreen
