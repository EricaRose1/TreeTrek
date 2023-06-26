import { useState } from 'react'
import Modal from './Modal'

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteItem = async() => {
        try{
            const response = await fetch(`http://localhost:3001/campinglist/${task.id}` , {
                method: 'DELETE'
            })
            if(response.status === 200) {
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='list-item'>
            <div className='info-container'>
                <p className='task-title'>{task.title}</p>
            </div>
            <div className='button-container'>
                <button className='delete' onClick={deleteItem}>Delete</button>
            </div>
            {showModal && <Modal  setShowModal={setShowModal} getData={getData} task={task}/>}
        </div>
        // mode={'edit'} added in Modal
    )
}

export default ListItem;