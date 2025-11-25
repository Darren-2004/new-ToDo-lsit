
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Users from './Users'
import Product from './Porduct'
import ProdDes from './ProdDes';

function App() {
  return (
    <>
    {/* <Router>
            <Routes>
                <Route path="/" element={<MyToDoList />} />
                <Route path="/list" element={<List />} />
                rou
            </Routes>
        </Router> 
        <Character/> */}
        <Router>
            <Routes>
                <Route path="/" exact Component={Product} />
                <Route path="/Product/:id" Component={ProdDes} />
                
            </Routes>
        </Router> 
       

        

              
    </>
  )
}

export default App
