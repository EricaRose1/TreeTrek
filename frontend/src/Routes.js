import React from 'react';
import CampingList from './CampingList';
import ParkCard from './ParkCard';
import Home from './Home'
import Auth from './component/Auth.js'
import { Routes, Route  } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
        <Route  exact path="/" element={<Home/>}/>
        <Route  exact path="/parkcard" element={<ParkCard/>}/>
        <Route exact path='/Auth' element={<Auth/>}/>
        <Route exact path='/CampingList' element={<CampingList/>} />
    </Routes>
  )
};

export default Router;