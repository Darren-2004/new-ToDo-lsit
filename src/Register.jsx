import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/register', {
                username,
                password,
                confirmPassword
            });
            
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/products');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'Registration failed');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Create Account</h2>
                {error && <p className='text-red-500 mb-4 text-center text-sm'>{error}</p>}
                
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
                
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                />
                
                <button 
                    type='submit' 
                    disabled={loading}
                    className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-semibold disabled:bg-gray-400'
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
                
                <p className='text-center mt-4 text-gray-600'>
                    Already have an account? <Link to='/' className='text-blue-500 hover:underline'>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
