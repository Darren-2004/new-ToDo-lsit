import List from './List'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyToDoList from './MyToDoList'
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
      
    </>
  )
}

export default App
