import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://simple-fastapi-crud-app.onrender.com/products';

const ProdDes = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        fetchProduct(); // Fetch product when component mounts or id changes
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProduct(response.data); // Update product state
        } catch (error) {
            console.error('Error Fetching product', error);
            setError("Failed to fetch product."); // Set error message
        }
    };

    // Check for loading and error states
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>; // Display error message
    }

    if (!product) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="relativ bg-gray-100 border border-gray-300 rounded-lg p-6 max-w-md mx-auto shadow-lg">
            <Link to='/'>
                <button className='absolute top-2 left-3 text-black mb-4 '>X</button>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-2 text-justify ">Description:{product.description}</p>
            <p className="text-gray-700 mb-2">Price: <span className="font-semibold">${product.price}</span></p>
            <p className="text-gray-700">In Stock: <span className="font-semibold">{product.in_stock}</span></p>
        </div>
    );
}

export default ProdDes;