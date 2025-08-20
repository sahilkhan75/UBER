import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

export default function CaptainLogin() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [captaindata, setcaptaindata] = useState({})

  const { captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submithandler = async (e) => {
    e.preventDefault()
    const captaindata = {
      email: email,
      password: password

    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captaindata)
    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }


    setemail('')
    setpassword('')

  }




  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20' src="https://ih1.redbubble.net/image.5007880594.5940/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="" />
        <form onSubmit={(e) => submithandler(e)} className='flex flex-col mt-5'>
          <h3 className='text-lg font-medium mb-2 mt-4'>Enter Your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'> Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
          >Login
          </button>
        </form>
        <p className='text-center font-semibold'> Join a fleet?  <Link to="/captain-signup" className='text-blue-600 font-normal'>Register as a captain</Link></p>
      </div>

      <div>
        <Link to='/login'
          className='bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
        >
          Sign in as user
        </Link>
      </div>
    </div >
  )
}
