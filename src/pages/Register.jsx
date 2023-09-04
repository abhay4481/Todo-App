import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { context, server } from "../index"
import toast from "react-hot-toast"

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context);


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
            )
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error("Invalid email or password")
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder='Enter your name'
                        required
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Enter your email'
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Enter your password'
                        required
                    />
                    <button disabled={loading} type='submit'>Register</button>
                    <h4>or</h4>
                    <Link to={'/Login'}>Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Register
