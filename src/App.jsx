
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import './App.css'

// import Users from './Users'
// import Product from './Porduct'
// import ProdDes from './ProdDes';
// import UpdateProduct from './UpdateProduct';

// function App() {
//   return (
//     <>
//     {/* <Router>
//             <Routes>
//                 <Route path="/" element={<MyToDoList />} />
//                 <Route path="/list" element={<List />} />
//                 rou
//             </Routes>
//         </Router> 
//         <Character/> */}
//       {/* <Router>
//           <Routes>
//               <Route path="/" exact Component={Product} />
//               <Route path="/Product/:id" Component={ProdDes} />
              
//           </Routes>
//       </Router>  */}

//       <UpdateProduct/>


       

        

              
//     </>
//   )
// }

// export default App


// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './UpdateProduct';
import Register from './Register';
import Protected from './Protected';
import Product from './Porduct'   // A new Products component

const App = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load token from local storage on component mount
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        setIsLoading(false);
    }, []);

    // Function to handle logout
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div>
                <h1>JWT Authentication Example</h1>
                <Routes>
                    <Route 
                        path="/" 
                        element={token ? <Navigate to="/products" /> : <Login setToken={setToken} />} 
                    />
                    <Route 
                        path="/register" 
                        element={token ? <Navigate to="/products" /> : <Register setToken={setToken} />} 
                    />
                    <Route 
                        path="/products" 
                        element={token ? <Product token={token} logout={logout} /> : <Navigate to="/" />}
                    />
                    <Route 
                        path="/protected" 
                        element={token ? <Protected token={token} /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;