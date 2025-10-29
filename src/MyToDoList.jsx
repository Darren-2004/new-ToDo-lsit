import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function MyToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [task, setTask] = useState({
        title: '',
        work: '',
        color: '', // Default color
    });

    const [selected, setSelected] = useState('Select an option v');
    const [isOpen, setIsOpen] = useState(false);
    const green = '#008000';
    const blue = '#1a43bf';
    const red = '#ff0000';
    const options = ['red', "green", "blue"];

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSub = (e) => {
        e.preventDefault();
        if (task.title && task.work && task.color) {
            const newTask = { ...task, id: uuidv4() };
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            setTask({ title: '', work: '', color: '' }); // Reset to default color
            navigate('/list');
        }
    };

    const handleColorSelect = (color) => {
        setSelected(color);
        setTask((prevTask) => ({ ...prevTask, color })); // Update the color in the task state
        setIsOpen(false);
    };

    return (
        <>
        
            <form onSubmit={handleSub} className="flex flex-col gap-5 w-[300px]  mx-auto mt-10 md:w-[800px] md:text-2xl">
                <input
                    className="border-2 rounded p-2"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={task.title}
                    onChange={handleChange}
                />
                <input
                    className="border-2 rounded p-2"
                    type="text"
                    name="work"
                    placeholder="Work"
                    value={task.work}
                    onChange={handleChange}
                />
                <div>
                <div onClick={() => setIsOpen(!isOpen)} className=" rounded flex flex-col  items-center p-2 w-inherit cursor-pointer">
                    {selected}
                </div>
                {isOpen && (
                    <ul className="text-white divide-y-[1px]" >
                        {options.map((option, index) => (
                            <li key={index} onClick={() => handleColorSelect(option)} style={{ padding: '10px', cursor: 'pointer' }}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
                <button type="submit">Submit</button>
            </form>

            

            <button onClick={() => navigate('./List')}>Go to list</button>
        </>
    );
}

export default MyToDoList;