// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NewProduct from './NewProduct';
// import { Link } from 'react-router-dom';

// const API_URL = 'https://simple-fastapi-crud-app.onrender.com/products';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState(null);
//     const [productName, setProductName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [displayPopUp, setDisplayPopUp] = useState(false);

//     useEffect(() => {
//         fetchProducts(); // Fetch products on component mount
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get(API_URL);
//             if (response.status !== 200) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             setProducts(response.data);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to fetch products.");
//         }
//     };

//     const createProduct = async () => {
//         try {
//             await axios.post(API_URL, { 
//                 name: productName,
//                 price: parseFloat(price),
//                 description,
//                 in_stock: 1 
//             });
//             fetchProducts(); // Refresh the product list
//             clearInputs();
//             setDisplayPopUp(false); // Close the popup after creation
//         } catch (err) {
//             console.error(err);
//             setError("Failed to create product.");
//         }
//     };

//     const clearInputs = () => {
//         setProductName('');
//         setPrice('');
//         setDescription('');
//     };

//     const togglePopUp = () => {
//         setDisplayPopUp(!displayPopUp);
//     };

//     const updateProductStock = async (updatedProduct) => {
//         await axios.put(`${API_URL}/${updatedProduct.id}/`, updatedProduct);
//     };

//     const addProduct = async (product) => {
//         // Optimistically update the UI
//         const updatedProduct = { ...product, in_stock: product.in_stock + 1 };
//         setProducts(prevProducts => 
//             prevProducts.map(p => (p.id === product.id ? updatedProduct : p))
//         );

//         try {
//             // Update the stock in the API
//             await updateProductStock(updatedProduct);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to update product stock.");
//             // If it fails, revert the optimistic update
//             setProducts(prevProducts => 
//                 prevProducts.map(p => (p.id === product.id ? product : p))
//             );
//         }
//     };

//       const deleteProduct = async (product) => {
//         // Optimistically update the UI
//         const updatedProduct = { ...product, in_stock: product.in_stock - 1 };
//         setProducts(prevProducts => 
//             prevProducts.map(p => (p.id === product.id ? updatedProduct : p))
//         );

//         try {
//             // Update the stock in the API
//             await updateProductStock(updatedProduct);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to update product stock.");
//             // If it fails, revert the optimistic update
//             setProducts(prevProducts => 
//                 prevProducts.map(p => (p.id === product.id ? product : p))
//             );
//         }
//     };

//     // const deleteProduct = async (product) => {
//     //     if (product.in_stock > 1) {
//     //         // If stock > 1, decrement the stock
//     //         const updatedProduct = { ...product, in_stock: product.in_stock - 1 };
//     //         try {
//     //             await updateProductStock(updatedProduct);
//     //             fetchProducts(); // Refresh product list
//     //         } catch (err) {
//     //             console.error(err);
//     //             setError("Failed to update product stock.");
//     //         }
//     //     } else {
//     //         // If stock is 1 or less, delete the product
//     //         try {
//     //             await axios.delete(`${API_URL}/${product.id}/`); // Correct endpoint
//     //             fetchProducts(); // Refresh product list
//     //         } catch (err) {
//     //             console.error(err);
//     //             setError("Failed to delete product.");
//     //         }
//     //     }
//     // };

//     return (
//         <>
//             <div>
//                 <h1 className="text-xl font-bold">Product List</h1>
//                 {error && <p className="text-red-500">{error}</p>}
//                 <ul className="space-y-4">
//                     {products.map(product => (
//                         <li key={product.id} className='bg-white text-black rounded-lg shadow p-4 flex justify-between items-center'>
//                             <div className="text-start">
//                                 <Link to={`/product/${product.id}`}>
//                                     <p className='text-xl font-semibold'>{product.name}</p>
//                                 </Link>
//                                 <p className='text-sm text-gray-500'>In Stock: {product.in_stock}</p>
//                             </div>
//                             <p className='text-2xl'>${product.price}</p>
//                             <div className="flex space-x-2">
//                                 <button className='bg-red-500 text-white p-2 rounded' onClick={() => deleteProduct(product)}>Delete</button>
//                                 <button className='bg-green-500 text-white p-2 rounded' onClick={() => addProduct(product)}>+</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//                 <button className='border bg-blue-500 text-white p-2 rounded mt-4' onClick={togglePopUp}>
//                     Add Product
//                 </button>
//             </div>

//             {displayPopUp && (
//                 <NewProduct 
//                     fetchProducts={fetchProducts}
//                     clearInputs={clearInputs}
//                     productName={productName} 
//                     setProductName={setProductName} 
//                     price={price} 
//                     setPrice={setPrice} 
//                     description={description} 
//                     setDescription={setDescription}
//                     createProduct={createProduct}
//                     togglePopUp={togglePopUp}
//                     products={products}
//                 />
//             )}
//         </>
//     );
// };

// export default Product;

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
        // Load products from local storage
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            fetchProducts(); // Fetch from API if no local storage
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProducts(response.data);
            localStorage.setItem('products', JSON.stringify(response.data)); // Store in local storage
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

            // Optimistically update the UI and local storage
            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            // Now send to API
            await axios.post(API_URL, newProduct);
            clearInputs();
            setDisplayPopUp(false); // Close the popup after creation
        } catch (err) {
            console.error(err);
            setError("Failed to create product.");
        }
    };

    const clearInputs = () => {
        setProductName('');
        setPrice('');
        setDescription('');
    };

    const togglePopUp = () => {
        setDisplayPopUp(!displayPopUp);
    };

    const updateProductStock = async (updatedProduct) => {
        await axios.put(`${API_URL}/${updatedProduct.id}/`, updatedProduct);
    };

    const addProduct = async (product) => {
        const updatedProduct = { ...product, in_stock: product.in_stock + 1 };

        // Optimistically update the UI and local storage
        const updatedProducts = products.map(p => (p.id === product.id ? updatedProduct : p));
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        try {
            // Now update the stock in the API
            await updateProductStock(updatedProduct);
        } catch (err) {
            console.error(err);
            setError("Failed to update product stock.");
            // If it fails, revert the optimistic update
            setProducts(prevProducts => 
                prevProducts.map(p => (p.id === product.id ? product : p))
            );
        }
    };

const deleteProduct = async (product) => {
    // Copy the current state before making changes
    const currentProducts = [...products];

    try {
        // If stock > 1, decrement stock instead of deleting
        if (product.in_stock > 1) {
            const updatedProduct = { ...product, in_stock: product.in_stock - 1 };
            
            // Optimistically update the UI
            const updatedProducts = currentProducts.map(p => 
                p.id === product.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            
            // Now update the stock in the API
            await updateProductStock(updatedProduct);
        } else {
            // If stock is 1 or less, delete the product
            const updatedProducts = currentProducts.filter(p => p.id !== product.id);
            
            // Optimistically update the UI
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            
            // Proceed to delete the product from API
            await axios.delete(`${API_URL}/${product.id}/`);
        }
    } catch (err) {
        console.error(err);
        setError("Failed to delete product.");
        // In case of failure, revert to the previous state
        setProducts(currentProducts);
        localStorage.setItem('products', JSON.stringify(currentProducts));
    }
};

    return (
        <>
            <div>
                <h1 className="text-xl font-bold">Product List</h1>
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