
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewProduct from './NewProduct'; 
import { Link } from 'react-router-dom';

const API_URL = 'https://simple-fastapi-crud-app.onrender.com/products';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [displayPopUp, setDisplayPopUp] = useState(false);

    useEffect(() => {
        fetchProducts(); // Fetch from API on component mount
    }, []);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token'); // Assume token is stored in local storage
        if (!token) {
            setError("Unauthorized. Please log in.");
            return;
        }

        try {
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in header
                }
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProducts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products.");
        }
    };

    const createProduct = async () => {
        try {
            const newProduct = {
                name: productName,
                price: parseFloat(price),
                description,
                in_stock: 1 
            };

            const token = localStorage.getItem('token');
            await axios.post(API_URL, newProduct, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token for authorization
                }
            });

            // Optimistically update the UI
            setProducts(prevProducts => [...prevProducts, newProduct]);
            clearInputs();
            setDisplayPopUp(false);
        } catch (err) {
            console.error(err);
            setError("Failed to create product.");
        }
    };

    const clearInputs = () => {
        setProductName('');
        setPrice('');
        setDescription('');
        setError(null); // Clear error on new inputs
    };

    const togglePopUp = () => {
        setDisplayPopUp(!displayPopUp);
    };

    const updateProductStock = async (updatedProduct) => {
        const token = localStorage.getItem('token');
        await axios.put(`${API_URL}/${updatedProduct.id}/`, updatedProduct, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    const addProduct = async (product) => {
        const updatedProduct = { ...product, in_stock: product.in_stock + 1 };
        const updatedProducts = products.map(p => (p.id === product.id ? updatedProduct : p));

        setProducts(updatedProducts);
        try {
            await updateProductStock(updatedProduct);
        } catch (err) {
            console.error(err);
            setError("Failed to update product stock.");
        }
    };

    const deleteProduct = async (product) => {
        const token = localStorage.getItem('token');
        if (product.in_stock > 1) {
            const updatedProduct = { ...product, in_stock: product.in_stock - 1 };
            const updatedProducts = products.map(p => (p.id === product.id ? updatedProduct : p));

            setProducts(updatedProducts);
            await updateProductStock(updatedProduct);
        } else {
            const updatedProducts = products.filter(p => p.id !== product.id);
            setProducts(updatedProducts);
            try {
                await axios.delete(`${API_URL}/${product.id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                console.error(err);
                setError("Failed to delete product.");
            }
        }
    };

    return (
        <>
                <div className="bg-blue-600 text-white p-4 mb-4 flex justify-between items-center rounded">
                    <h1 className="text-2xl font-bold">Product List</h1>
                    <button 
                        onClick={logout}
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold'
                    >
                        Logout
                    </button>
                </div>
                <div>
                {error && <p className="text-red-500">{error}</p>}
                <ul className="space-y-4">
                    {products.map(product => (
                        <li key={product.id} className='bg-white text-black rounded-lg shadow p-4 flex justify-between items-center'>
                            <div className="text-start">
                                <Link to={`/product/${product.id}`}>
                                    <p className='text-xl font-semibold'>{product.name}</p>
                                </Link>
                                <p className='text-sm text-gray-500'>In Stock: {product.in_stock}</p>
                            </div>
                            <p className='text-2xl'>${product.price}</p>
                            <div className="flex space-x-2">
                                <button className='bg-red-500 text-white p-2 rounded' onClick={() => deleteProduct(product)}>Delete</button>
                                <button className='bg-green-500 text-white p-2 rounded' onClick={() => addProduct(product)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className='border bg-blue-500 text-white p-2 rounded mt-4' onClick={togglePopUp}>
                    Add Product
                </button>
            </div>

            {displayPopUp && (
                <NewProduct 
                    fetchProducts={fetchProducts}
                    clearInputs={clearInputs}
                    productName={productName} 
                    setProductName={setProductName} 
                    price={price} 
                    setPrice={setPrice} 
                    description={description} 
                    setDescription={setDescription}
                    createProduct={createProduct}
                    togglePopUp={togglePopUp}
                />
            )}
        </>
    );
};

export default Product;