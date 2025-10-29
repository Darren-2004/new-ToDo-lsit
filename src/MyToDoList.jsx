
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function MyToDoList() {

//     const [tasks,setTasks] = useState([])

//     const [task, setTask] = useState({
//         title: '',
//         work: '',
//         color: '',
//     });

//     const handleStoreData = () =>{
//         const jsonString = JSON.stringify(task);
//         localStorage.setItem('task', jsonString);
//         alert('Data stored')
//     }
    

//     const navigate = useNavigate(); 

//     function handleChange(e) {
//         const { name, value } = e.target;
//         setTask((prevTask) => ({ ...prevTask, [name]: value }));
//     }

//    const handleSub = (e) => {
//     e.preventDefault();
//     if (task.title && task.work && task.color) {
//         // Update tasks state
//         setTasks((prevTasks) => {
//             const newTask = { ...task, id: prevTasks.length + 1 };
//             console.log('New Task:', newTask); // Log the new task
//             return [...prevTasks, newTask];
//         });
//         setTask({ title: '', work: '', color: '' }); // Clear the input
//     }
//     console.log('Tasks after submission:', tasks); // This will still show the previous state
//     navigate('/list'); // Navigate to the List component
// };
    
//     return (
//         <>
//             <form className="flex flex-col gap-2" onSubmit={handleSub}>
//                 <input
//                     className="border-2 w-[200px] h-[45px] flex justify-center pl-2"
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     value={task.title}
//                     onChange={handleChange}
//                 />
//                 <input
//                     className="border-2 w-[200px] h-[45px] flex justify-center pl-2"
//                     type="text"
//                     name="work"
//                     placeholder="Work"
//                     value={task.work}
//                     onChange={handleChange}
//                 />
//                 <input
//                     className="border-2 w-[200px] h-[45px] flex justify-center pl-2"
//                     type="text"
//                     name="color"
//                     placeholder="Color"
//                     value={task.color}
//                     onChange={handleChange}
//                 />
//                 <a href="./List.jsx">
//                     <button type="submit" >Submit</button>
//                 </a>
//                 <button onClick={handleStoreData}>store</button>
                
//             </form>
            
//         </>
//     );
// }

// export default MyToDoList;


// import { useEffect, useState } from "react";

// function MyToDoList({ setTasks }) {
//     const [task, setTask] = useState({
//         title: '',
//         work: '',
//         color: '',
//     });

//     // Load tasks from local storage on component mount
//     useEffect(() => {
//         const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//         setTasks(storedTasks);
//     }, [setTasks]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask((prevTask) => ({ ...prevTask, [name]: value }));
//     };

//     const handleSub = (e) => {
//         e.preventDefault();
//         if (task.title && task.work && task.color) {
//             setTasks((prevTasks) => {
//                 const newTasks = [...prevTasks, { ...task, id: prevTasks.length + 1 }];
//                 // Save to local storage
//                 localStorage.setItem('tasks', JSON.stringify(newTasks));
//                 return newTasks;
//             });
//             setTask({ title: '', work: '', color: '' });
//         }
//     };

//     return (
//         <form onSubmit={handleSub}>
//             <input name="title" value={task.title} onChange={handleChange} placeholder="Title" />
//             <input name="work" value={task.work} onChange={handleChange} placeholder="Work" />
//             <input name="color" value={task.color} onChange={handleChange} placeholder="Color" />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

// export default MyToDoList;
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