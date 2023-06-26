import { useState } from 'react'
import { useCookies } from 'react-cookie'


const Modal = ({mode, setShowModal, getData, task}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : null,
        date: editMode ? task.date : new Date()
    })

    const postData = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3001/campinglist`, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            if(response.status === 200) {
                console.log('Worked!')
                setShowModal(false)
                getData()
            }
        }catch(err){
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const{name, value} = e.target

        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)
    }

    return (
        <div className='overlay'>
            <div className='modal'>
                <div className='form-title-container'>
                    <h3> Let's {mode} your list</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>
                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder='Add Item Here'
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br/>
                    <input className={mode} type='submit' onClick={editMode ? '' : postData}/>
                </form>

            </div>
        </div>
    )
}
export default Modal;