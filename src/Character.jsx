import React, { useState, useEffect } from "react";
import axios from "axios";

function Character() {
    const [characters, setCharacters] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    const API_URL = 'https://dattebayo-api.onrender.com/characters?limit=5';

    useEffect(() => {
        // Fetch character data
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

        fetchCharacters();
    }, []);

    return (
        <div>
            <h1>Character List</h1>
            {error && <p>Error fetching character data: {error}</p>}
            <ul>
                {characters.map(character => (
                    <li key={character.id}>
                        {character.images[0]}   
                        <h2>Character name : {character.name}</h2>
                        <img src={character.images[0]}  />
                        <h3>character father name : {character.family.father}</h3>
                        <h3>character mother name : {character.family.mother}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Character;