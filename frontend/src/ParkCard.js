import React, {useEffect, useState} from 'react';

import axios from 'axios';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import './ParkCard.css';


function ParkCard() {
    const [parkData, setParkData] = useState([])
    const [parkName, setParkName] = useState([{}])
    const [parkContact, setParkContact] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/parks',
        }
        axios.request(options).then((response) => {
            setParkData(response.data)
            setParkName(response.data.data)
            setParkContact(response.data.data.map((park) => park.contacts))
            console.log(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])


    return(
        
        <div className='Park'>
            <NavBar linkNames={['parkcard']} />

            

            <h1>Parks List</h1>
            
            
            {parkData && <p className='Total'>There are a total of {parkData.total} National Parks</p>}
            {parkName.map((park, index) => (
                <div key={index}>
                    <ul className='ParkList'>
                        <li className='ParkName'>Park Name: {park.fullName}</li>
                        <li>State: {park.states} </li>
                        <li>description: {park.description}</li> 
                        <li>Park Website: <a href={park.url} target="_blank"> {park.url}</a></li> 

                        {parkContact[0] &&
                            parkContact[index].phoneNumbers &&
                            parkContact[index].phoneNumbers.map((number, i) => (
                                <li key={i}>Phone Numbers: {number.phoneNumber}</li>
                            ))}

                    </ul>
                </div>
            ))}
            {/* <button onClick='/parks'>Get Parks</button> */}
                 <SearchBar />
        </div>
    )
}

export default ParkCard;