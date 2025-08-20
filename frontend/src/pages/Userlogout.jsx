import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Userlogout() {

    const token = localStorage.getItem('token')
    console.log(token)
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

    return (
        <>
        </>
    )
}
