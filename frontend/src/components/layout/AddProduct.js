import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { DataContext } from '../../contexts/DataContext'

function AddProduct() {
    const {
        dataState: { types, categories, products },
        loadCategories,
        loadProducts
    } = useContext(DataContext)

    const [productForm, setProductForm] = useState({
        name:'',
        category:'',
        price:'',
        description:'',
    })

    const onProductFormChange = (event) => {
        setProductForm({
            ...productForm, [event.target.name]: event.target.value
        })
        console.log(productForm)
    }

    return (
        <div>
            <h3>Thêm sản phẩm</h3>
            <Form>
                <Form.Group >
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                    onChange={onProductFormChange}
                        type='text'
                        name='name'
                        required />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Loại</Form.Label>
                    <select name='type' required className="browser-default custom-select"  >
                        {
                            
                        }
                    </select>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Danh mục</Form.Label>
                    <select required className="browser-default custom-select"  >
                        {

                        }
                    </select>
                </Form.Group>
            

                <Form.Group>
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                        required
                        onChange={onProductFormChange}
                        type='number'
                        name='price'
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control as="textarea" rows={3} name='description' onChange={onProductFormChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ảnh minh họa</Form.Label>
                    <Form.File name='thumbnail' onChange={onProductFormChange} />
                </Form.Group>
                <Button variant='success' className='mt-3' type='submit'>Thêm</Button>
            </Form>
        </div>
    )
}

export default AddProduct
