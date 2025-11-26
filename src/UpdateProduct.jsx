// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { username, password });
            setToken(response.data.token); // Save the token
            localStorage.setItem('token', response.data.token); // Persist token
            navigate('/products'); // Redirect to products page
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                />
            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-semibold'>Login</button>
            <p className='text-center mt-4 text-gray-600'>
                Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Sign up</Link>
            </p>
            </form>
        </div>
    );
};

export default Login;