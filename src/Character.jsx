import React, { useState, useEffect } from "react";
import axios from "axios";

function Character() {
    const [characters, setCharacters] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    const [userInput , setUserInput]= useState(); // Example user input
    //const [limit,setLimit] = useState(); // Example limit
    const myUrl = `https://dattebayo-api.onrender.com/characters?name=${userInput}`;
    const API_URL = myUrl;

    useEffect(() => {
        // Fetch character data
      

        fetchCharacters();
    }, []); // Dependency array includes API_URL

      const fetchCharacters = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log(response);
                if (!response.status ===200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.data;
                setCharacters(data.characters); 
            } catch (err) {
               console.log( err)
               setError(err.message) 
            }
        };

    const handlesearch = ()=>{
        setError(null)
        fetchCharacters();
    }
   

    return (

        < >

        <div>
            <h1 className="text-2xl font-bold text-center">Character Search</h1>
            <div className="flex justify-center mt-4">
                <input type="text"
                       value={userInput}
                       onChange={(e) => setUserInput(e.target.value)}
                       className="border-2 border-gray-300 rounded p-2"
                       placeholder="Enter character name" />
                <button onClick={handlesearch}
                        className="ml-2 bg-blue-500 text-white rounded p-2">
                    search
                </button>
            </div>
        </div>
        <div className="text-black flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Character List</h1>
             {error && <p className="text-red-500 mb-4">Error fetching character data: {error}</p>}
             <ul className="w-full max-w-4xl">
               {characters.map(character => (
            <li key={character.id} className=" flex flex-col items-center p-4 bg-white rounded shadow-md mb-4 border border-gray-300 divide-x w-100 h-100">
                <img className="col-span-1 w-20 h-16 object-cover rounded h-full w-full" src={character.images[0]} alt="No image for ${character.name}" />    
                <h2 className="col-span-3 pl-4 text-lg font-semibold h-1/5">Character Name: {character.name}</h2>
            </li>
        ))}
    </ul>
</div>
        </>
       
    );
}

export default Character;