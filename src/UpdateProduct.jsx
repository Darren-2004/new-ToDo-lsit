import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewProduct from './NewProduct';
import UpdateProduct from './UpdateProduct'; // Import the new component

const API_URL = 'https://simple-fastapi-crud-app.onrender.com/products';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [displayUpdatePopUp, setDisplayUpdatePopUp] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null); // State for the current product to update

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status : ${response.status}`);
            }
            setProducts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products.");
        }
    };

    const updateProductStock = async (id, newStock) => {
        try {
            await axios.put(`${API_URL}/${id}`, { in_stock: newStock });
            fetchProducts();
        } catch (err) {
            console.error(err);
            setError("Failed to update product stock.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
            setError("Failed to delete product.");
        }
    };

    const clearInputs = () => {
        // Clear necessary inputs if needed
    };

    const togglePopUp = () => {
        setDisplayPopUp(!displayPopUp);
    };

    const toggleUpdatePopUp = () => {
        setDisplayUpdatePopUp(!displayUpdatePopUp);
    };

    const openUpdatePopup = (product) => {
        setCurrentProduct(product);
        toggleUpdatePopUp();
    };

    return (
        <>
            <div>
                <h1>Product List</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {products.map(product => (
                        product.in_stock > 0 ? (
                            <li key={product.id}>
                                {product.name} - ${product.price}
                                <button onClick={() => {
                                    if (product.in_stock > 1) {
                                        updateProductStock(product.id, product.in_stock - 1);
                                    } else {
                                        deleteProduct(product.id);
                                    }
                                }}>
                                    {product.in_stock > 1 ? "Remove One" : "Delete"}
                                </button>
                                <button onClick={() => openUpdatePopup(product)}>Edit</button>
                                <p>In Stock: {product.in_stock}</p>
                            </li>
                        ) : null
                    ))}
                </ul>
                <button className='border bg-gray-500 p-2 rounded' onClick={togglePopUp}>
                    Add product
                </button>
            </div>

            {displayPopUp && (
                <NewProduct 
                    fetchProducts={fetchProducts}
                    clearInputs={clearInputs}
                    togglePopUp={togglePopUp}
                />
            )}

            {displayUpdatePopUp && currentProduct && (
                <UpdateProduct 
                    product={currentProduct} 
                    fetchProducts={fetchProducts} 
                    togglePopUp={toggleUpdatePopUp} 
                />
            )}
        </>
    );
};

export default Product;