
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
import icon from './assets/icon.svg'

function List() {
    const [storedArray, setStoredArray] = useState([]);
    const navigate = useNavigate(); // Use the navigate hook

    useEffect(() => {
        const storedJsonString = localStorage.getItem('tasks');

        if (storedJsonString) {
            const parsedArray = JSON.parse(storedJsonString);
            setStoredArray(parsedArray);
        } else {
            console.log('No data found');
        }
    }, []);

    
    function handleRemoveTask(id) {
        // Filter out the task with the given id
        const updatedArray = storedArray.filter(item => item.id !== id);
        setStoredArray(updatedArray);
        localStorage.setItem('tasks', JSON.stringify(updatedArray)); // Update local storage
    }

    return (
        <div className='p-5 flex items-center flex-col'>
            <button 
                className="absolute top-10 left-10"
                // Navigate back to MyToDoList
            >
                Back
            </button>
            <h1>Retrieved Data</h1>
            {storedArray.length > 0 ? (
                <ul className='grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-15 '>
                    {storedArray.map((item,index) => (
                        <li key={item.id} className="w-45 h-40 md:w-66 md:h-60 bg-slate-900 rounded-[10px]  uppercase p-5 relative ">
                            <div className='text-left h-4/5 overflow-hidden text-wrap flex flex-col gap-2'>
                            <p className="text-xl  truncate ">{item.title}</p>
                            <p className="text-gray-500 text-sm h-auto h-2/4 text-wrap truncate">{item.work}</p>
                            </div>
                           <div className="w-[20px] h-1/8 rounded-full truncate absolute right-3 bottom-3 " style={{ backgroundColor: item.color }}></div>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=delete" />
                            <span className="material-symbols-outlined absolute left-3 bottom-3 cursor-pointer " onClick={()=> handleRemoveTask(item.id)}>delete</span>
                            
                        </li>
                    ))}
                    <div></div>
                </ul>
            ) : (
                <p>No data available</p>
            )}
            <img src= {icon} className='w-[100px] h-[100px] m-10 cursor-pointer'  onClick={() => navigate('/')}/>
        </div>
    );
}

export default List;