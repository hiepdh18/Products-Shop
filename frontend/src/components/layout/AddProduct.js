import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import productApi from '../../api/productApi'
import { DataContext } from '../../contexts/DataContext'

function AddProduct() {
    const {
        dataState: { types, categories },
        loadCategories
    } = useContext(DataContext)

    const [productForm, setProductForm] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
    })


    const onProductFormChange = (event) => {
        setProductForm({
            ...productForm,
            [event.target.name]: event.target.value
        })
        console.log(productForm)
    }
    let typeId
    let catId

    const typeSelectHandle = (event) => {
        typeId = event.target.value
        loadCategories(typeId)
    }
    const catSelectHandle = (event) => {
        catId = event.target.value
        setProductForm({
            ...productForm,
            category: catId
        })
    }
    const createProduct = async (event) =>{
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', productForm.name);
        formData.append('code', 'ASDF6');
        formData.append('category', productForm.category);
        formData.append('description', productForm.description);
        formData.append('price', productForm.price);
        formData.append('thumbnail', productForm.thumbnail);
        try {
            await productApi.createProduct(formData)
        } catch (error) {
            console.log(error)
        }
    } 

    const onImageChange = (event) => {
        console.log(productForm.category)
        setProductForm({
            ...productForm,
            thumbnail: event.target.files[0]
        })
        console.log(productForm.category)
    }

    return (
        <div>
            <h3>Thêm sản phẩm</h3>
            <Form onSubmit={createProduct}>
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
                    <select name='type' required className="browser-default custom-select" onChange={typeSelectHandle} >
                        {
                            types.map(type => (
                                <option key={type._id} value={type._id}>{type.name}</option>
                            ))
                        }
                    </select>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Danh mục</Form.Label>
                    <select
                        required
                        name='category'
                        className="browser-default custom-select"
                        onChange={catSelectHandle}
                    >
                        {
                            categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
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
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control as="textarea" rows={3} name='description' onChange={onProductFormChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label onChange={onImageChange}>Ảnh minh họa</Form.Label>
                    <Form.File  />
                </Form.Group>
                <Button variant='success' className='mt-3' type='submit'>Thêm</Button>
            </Form>
        </div>
    )
}

export default AddProduct
