import ListHeader from './component/ListHeader';
import ListItem from './component/ListItem';
import './App.css'
import Auth from './component/Auth'


import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';


const CampingList = () => {
  const [cookies, setCookie, removeCookie ] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email 
  const [ tasks, setTasks] = useState(null)

  const getData = async () => {
    try{
      const response = await fetch(`http://localhost:3001/campinglist/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    } 
  }

  useEffect(() => {
    if(authToken) {
    getData()
  }}, [])


  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
     {!authToken && <Auth/>} 
    {authToken &&
    <>
    
     <ListHeader listName={'Camping List'} getData={getData}/>
     
     {sortedTasks?.map((task) =><ListItem key={task.id} task={task} getData={getData} />)}
     </>}
    </div>
  )
};


export default CampingList;