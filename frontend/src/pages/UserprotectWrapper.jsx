import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserprotectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setuser } = useContext(UserDataContext)
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        const fetchuser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    setuser(response.data.user)
                    setisLoading(false)
                }
            } catch (error) {
                console.log(error)
                localStorage.removeItem('token')
                navigate('/login')

            }
        }



        fetchuser()
    }, [token, navigate, setuser])

    if (isLoading) {
        return <div>Loading....</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserprotectWrapper