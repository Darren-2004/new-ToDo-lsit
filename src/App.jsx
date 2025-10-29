import List from './List'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyToDoList from './myToDoList'
import './App.css'

function App() {
  return (
    <>
   <Router>
            <Routes>
                <Route path="/" element={<MyToDoList />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </Router>
       {/* // <List/> */}
    </>
  )
}

export default App
