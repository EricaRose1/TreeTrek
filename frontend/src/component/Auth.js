import { useState } from 'react';
import { useCookies } from 'react-cookie'

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError('Make sure Passwords Match')
            return 
        }
        const response = await fetch(`http://localhost:3001/${endpoint}`, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const data = await response.json()
        console.log(data)

        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)

            window.location.reload()
        }
        
    }
    


    return (
        <div className='Auth-container'>
            <div>
                <form>
                    <h2>{isLogIn ? 'please login' : 'please sign up'}</h2>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogIn && <input
                                    type='password'
                                    placeholder="confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input type='submit'
                            className='create'
                            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
                            {error && <p>{error}</p>}
                </form>
                <div className='auth-options'>
                    <button onClick={() => viewLogin(false)}>Sign Up</button>
                    <button onClick={() => viewLogin(true)}>Login</button>

                </div>
            </div>
            
        </div>
    )
}

export default Auth;