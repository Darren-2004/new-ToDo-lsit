
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
import { useState, useEffect } from "react";

function List() {
    const [storedArray, setStoredArray] = useState([]);

    useEffect(() => {
        const storedJsonString = localStorage.getItem('tasks'); // Retrieve tasks from local storage

        if (storedJsonString) {
            const parsedArray = JSON.parse(storedJsonString);
            setStoredArray(parsedArray); // Update state with the retrieved tasks
        } else {
            console.log('No data found'); // Log if no data is available
        }
    }, []);

    return (
        <div>
            <h1>Retrieved Data</h1>
            {storedArray.length > 0 ? (
                <ul>
                    {/* Display each task's properties */}
                    {storedArray.map(item => (
                        <li key={item.id} className="w-50 bg-slate-900 rounded-[10px] text-left uppercase text-white p-5 flex flex-col gap-2 relative">
                            <p className="text-xl">{item.title}</p>
                            <p className="text-gray-500 text-sm">{item.work}</p>
                            {/* Dynamically set the background color */}
                            <div className={`w-[20px] h-[20px] bg-${item.color}-500 rounded-full absolute right-3 bottom-3`}></div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available</p> // Message if no data is present
            )}
        </div>
    );
}

export default List;
