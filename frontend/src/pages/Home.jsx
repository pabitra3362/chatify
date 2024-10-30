import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    const handleClick = () => {
        dispatch(setUser(username))
        localStorage.setItem('username',username)
        navigate('/chat')
    }

    useEffect(() => {
        if (user) {
            setUsername(user)
        } else {
            setUsername("")
        }
    }, [])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="container grid justify-center items-center text-center gap-4">
                <h1 className='md:text-5xl lg:text-6xl'>Welcome To Chatify</h1>
                <h2 className='md:text-4xl lg:text-5xl'>Feeling bored🥱🥱🥱</h2>
                <h2 className='md:text-5xl lg:text-7xl'>Wanna chat with someone?</h2>
                <input
                    className='h-14 text-2xl px-3 font-bold text-black'
                    type="text"
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                    className='h-12'
                    variant="outline-info"
                    disabled={username.length === 0 ? true : false}
                    onClick={handleClick}
                >
                    Let's Get Started
                </Button>
            </div>
        </div>
    )
}

export default Home
