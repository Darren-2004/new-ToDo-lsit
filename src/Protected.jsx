// src/Protected.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = ({ token }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                setData(null);
            }
        };

        fetchData();
    }, [token]);

    if (!data) {
        return <div>Access denied!</div>;
    }

    return (
        <div>
            <h2>Protected Data:</h2>
            <p>{data.message}</p>
        </div>
    );
};

export default Protected;