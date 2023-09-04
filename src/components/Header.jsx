import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { context, server } from '../index'

const Header = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context);

    const logoutHandler = async (e) => {
        setLoading(true)
        try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true
            }
            )
            toast.success("Logged out successfully")
            setIsAuthenticated(false)
            setLoading(false)
        } catch (error) {
            toast.error("Invalid email or password")
            setIsAuthenticated(true)
            setLoading(false)
        }
    }

    // if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <nav className='header'>
            <div>
                <h2>Todo App</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {
                    isAuthenticated ? (
                        <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>
                    ) : (<Link to={"/login"}>Login</Link>)
                }
            </article>
        </nav>
    )
}

export default Header
