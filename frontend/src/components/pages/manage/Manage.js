import React, { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'
import AddProduct from '../../layout/AddProduct'

function Manage() {

    const [products, setProducts] = useState([])
    const loadProducts = async () => {
        const list = await productApi.getProducts()
        setProducts(list)
    }
    useEffect(() => {
        loadProducts()

    }, [])
    console.log(products)
    return (
        <div className="">
            <div className="row">
                <div className="col-6">
                    <h2>Danh sách sản phẩm</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Danh mục</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <th scope="row">1</th>
                                    <td>{product.name}</td>
                                    <td>{product.code}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.price}</td>
                                    <td><button >Cập nhật</button> <button >Xóa</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                   <AddProduct>
                       
                   </AddProduct>
                </div>
            </div>

        </div>
    )
}

export default Manage
