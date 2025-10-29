
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function MyToDoList() {
    const [tasks, setTasks] = useState(() => {
        // Load tasks from local storage or initialize as empty array
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [task, setTask] = useState({
        title: '',
        work: '',
        color: 'red',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSub = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (task.title && task.work && task.color) {
            // Create a new task with a unique ID
            const newTask = { ...task, id: uuidv4() };
            
            // Update tasks state with the new task
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store updated tasks in local storage
                return updatedTasks; // Return the updated tasks array
            });
            
            // Clear the input fields
            setTask({ title: '', work: '', color: '' });
            
            // Navigate to the List component
            navigate('/list');
        }
    };

    return (
        <>
            <form onSubmit={handleSub}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={task.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="work"
                    placeholder="Work"
                    value={task.work}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={task.color}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default MyToDoList;