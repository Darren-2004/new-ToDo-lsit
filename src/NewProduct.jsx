import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://simple-fastapi-crud-app.onrender.com/products';

const NewProduct = ({ fetchProducts, clearInputs, togglePopUp, products = [] }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

   // Check for existing products with the same name
const checkExistingProduct = (name) => {
    return products.find(product => product.name.trim().toLowerCase() === name.trim().toLowerCase()) || null;
};

const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const existingProduct = checkExistingProduct(name);

    if (existingProduct) {
        // Increment the in_stock attribute
        const updatedProduct = {
            ...existingProduct,
            in_stock: existingProduct.in_stock + 1
        };

        try {
            const response = await axios.put(`${API_URL}/${existingProduct.id}`, updatedProduct);
            console.log("Update response:", response.data); // Log response for debugging
            fetchProducts(); // Refresh the product list
            clearInputs();   // Clear the input fields
            setName('');
            setPrice('');
            setDescription('');
            togglePopUp(); // Close the popup
        } catch (err) {
            console.error("Error updating product:", err); // Log any errors
        }
    } else {
        // Create a new product
        const newProduct = { 
            name, 
            price: parseFloat(price), 
            description, 
            in_stock: 1 
        }; // Initialize in_stock to 1

        try {
            const response = await axios.post(API_URL, newProduct);
            console.log("Create response:", response.data); // Log response for debugging
            fetchProducts(); // Refresh the product list
            clearInputs();   // Clear the input fields
            setName('');
            setPrice('');
            setDescription('');
            togglePopUp(); // Close the popup
        } catch (err) {
            console.error("Error creating product:", err); // Log any errors
        }
    }
};

return (
    <div className="top-0 p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                    required // Optional: requires user to fill this field
                />
            </div>
            <div>
                <label className="block text-gray-700">Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                    required // Optional: requires user to fill this field
                />
            </div>
            <div>
                <label className="block text-gray-700">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Add Product
            </button>
        </form>
    </div>
);
};

export default NewProduct;