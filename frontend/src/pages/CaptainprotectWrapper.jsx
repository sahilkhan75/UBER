import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainprotectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // if no token → redirect immediately
        if (!token) {
            navigate('/captain-login')
            return
        }


        const fetchCaptain = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (response.status === 200) {
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }
            } catch (err) {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }

        fetchCaptain()
    }, [token, navigate, setCaptain])

    if (isLoading) {
        return <div>Loading....</div>
    }

    return <>{children}</>
}

export default CaptainprotectWrapper
