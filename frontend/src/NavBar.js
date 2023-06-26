import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



import "./NavBar.css"


function NavBar() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const nav = useNavigate();

    const signout = () => {
        removeCookie('Email')
        removeCookie('AuthToken')
        let path = '/home'
        nav(path)
        // window.location.reload()
    }

    return (
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink exact to='/parkcard' className='link'>Parks</NavLink>
                </li>
                <li>
                    <NavLink exact to='/campinglist' className='link'>Camping Checklist</NavLink>
                </li>
                
            </ul>
            <button className='SignOut' onClick={signout} >Sign Out</button>
            <button className="BackBtn" onClick={() => nav(-1)}>Back</button>
        </div>
    )
}
export default NavBar;