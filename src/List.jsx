
//     // List.jsx

// function List({ tasks }) {
//     return (
//         <div>
//             <h1>Task List</h1>
//             <div className="task-container">
//                 {tasks.map((task) => (
//                     <div key={task.id} className="task-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
//                         <h2>{task.title}</h2>
//                         <p>Work: {task.work}</p>
//                         <p>Color: {task.color}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
     
//  import { useState,useEffect } from "react";

// function List() {

//         const [storedArray , setStoredArray] = useState([]);

//         useEffect(()=>{
//             const storedJsonString= localStorage.getItem('task');

//             if(storedJsonString){
//                  const parseddArray = JSON.parse(storedJsonString);
//             }else{
//                 alert('No data found')
//             }
//         },[])
        
       
        
    

//     return (
//         // <div className="flex flex-row  gap-5">
//         // <input className="border-2 rounded " type="text" placeholder="search" />
//         // <button className="">search</button>
//         // <button>console</button>
//         // </div>
//         <div>
//             <h1>retrieved data</h1>
//             {storedArray.length > 0 ? (
//                 <ul>
//                     {storedArray.map(item => (
//                         <li key={item.id}>{item.title} - {item.work} - {item.color}</li>
//                     ))}
//                 </ul>
//             ):(
//                 <p>No data available</p>
//             )}
//         </div>

//     )
// }
// export default List
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from './assets/icon.svg';
import { options } from './MyToDoList';

function List() {
    const [storedArray, setStoredArray] = useState([]);
    const [color, setColor] = useState(null);
    const [selected, setSelected] = useState('Select a color');
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Start with tasks visible
    
    const navigate = useNavigate();

    useEffect(() => {
        const storedJsonString = localStorage.getItem('tasks');
        if (storedJsonString) {
            setStoredArray(JSON.parse(storedJsonString));
        }
    }, []);

    const handleRemoveTask = (id) => {
        const updatedArray = storedArray.filter(item => item.id !== id);
        setStoredArray(updatedArray);
        localStorage.setItem('tasks', JSON.stringify(updatedArray));
    };

    const handleColorSelect = (color) => {
        setSelected(color);
        setColor(color);
        setIsOpen(false); // Close the dropdown after selecting a color
    };

    // Determine which array to display based on color selection
    const tasksToDisplay = color ? storedArray.filter(stored => stored.color === color) : storedArray;

    return (
        <div className='flex flex-col items-center p-5 m-0 bg-gray-100 min-h-screen w-3xl'>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-5 w-full max-w-md">
                <div className="flex justify-between items-center">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-blue-500 text-white rounded-full px-4 py-2 cursor-pointer transition duration-200 hover:bg-blue-600">
                        {selected}
                    </div>
                    <button className="text-blue-500" onClick={() => navigate('/')}>Back</button>
                </div>
                {isOpen && (
                    <ul className="text-black divide-y mt-2">
                        {options.map((option, index) => (
                            <li key={index} onClick={() => handleColorSelect(option)} className="py-2 hover:bg-gray-200 cursor-pointer">
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-4">
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg transition duration-200 hover:bg-blue-600">
                        {isVisible ? 'Hide Tasks' : 'Show Tasks'}
                    </button>
                </div>
            </div>

            {isVisible && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
                    {tasksToDisplay.length > 0 ? (
                        tasksToDisplay.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 relative transition duration-200 hover:shadow-lg">
                                <div className='flex flex-col h-full'>
                                    <p className="text-xl font-semibold truncate">{item.title}</p>
                                    <p className="text-gray-600 text-sm flex-grow truncate">{item.work}</p>
                                    <div className="w-[20px] h-[20px] rounded-full" style={{ backgroundColor: item.color }}></div>
                                </div>
                                <span
                                    className="material-symbols-outlined absolute right-3 bottom-3 text-red-500 cursor-pointer hover:text-red-700"
                                    onClick={() => handleRemoveTask(item.id)}>
                                    delete
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks available</p>
                    )}
                </div>
            )}

            <img src={icon} className='w-[100px] h-[100px] m-10 cursor-pointer' onClick={() => navigate('/')} />
        </div>
    );
}

export default List;