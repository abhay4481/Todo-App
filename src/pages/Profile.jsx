import React from 'react'
import { useContext } from 'react';
import Loader from '../components/Loader';
import { context } from '../index';

const Profile = () => {

    const { user, loading } = useContext(context)

    return (
        loading ? <Loader /> :
            (
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            )
    )
}

export default Profile;