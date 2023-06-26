import React, {useEffect, useState } from 'react';
import axios from 'axios';
import "./SearchBar.css";

function SearchBar() {
    const [searchResults, setSearchResults] = useState([])
    const [Results, setFilteredResults] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            url:'http://localhost:3001/parks'
        }
        axios.request(options).then((resp) => {
            setSearchResults(resp.data.data)
        
        }).catch((error) => {
            console.error(error)
        })
    },[]);

    const SearchChange = (e) => {
        e.preventDefault(); 
        const results = searchResults.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(results);
    }
 
    return ( 
    <div className='SearchBarContainer'>
        <form onSubmit={SearchChange} >
            <input className='SearchBar' 
                    type='text'
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    />
            <button className='SubmitBtn' 
                    type='submit'>Find Park</button>
        </form>

            <div className="ParkList">
                <h3>Park List</h3>
                
                <ul>
                    {Results.map(item => (
                        <li key={item.id}>
                            <a href='/parkcard' >{item.name} {item.states}</a>
                        </li>
                        
                    ))}
                </ul>

            </div>
        </div>
        )

}


export default SearchBar;