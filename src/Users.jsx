

import React, {useState,useEffect} from "react"

import axios from "axios"

const Users = () => {

    const [users, setUsers] = useState([{nom : 'john',
                                        id: 1
    },{nom:'jim',id:2}]);
    const [error , setError] = useState(null)

    

    useEffect (()=>{
        fetchUsers()
    },[])

    const fetchUsers = async () =>{
        const  API_URL = 'http://localhost:3500/users'

        try{
            const response = await axios.get(API_URL);
            if (response.status !== 200 ){
                throw new Error (`HTTP error! status : ${response.status}`)
            }
            setUsers(response.data)
        }catch(err){
            console.log(err)
            setError(err.message)
        }
    }

    // const handleDisplay = () =>{
    //     setError(null);
    //     fetchUsers()
    // }

    return (
        <div>   
           <ul className="flex flex-col w-full max-w-4xl">
                        {users.map(user => (
                            <li 
                                key={user.id} 
                                className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4 border border-gray-200 transition duration-200 hover:shadow-lg"
                            > 
                                
                                <h2 className="pl-4 text-lg font-semibold text-gray-800">
                                    {user.name}
                                </h2>
                                <h2 className="text-black">
                                    Email adress : {user.email}
                                </h2>
                            </li>
                        ))}
                    </ul>
        </div>
    );
}

export default Users;