import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

export default function Userlogin() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [userdata, setuserdata] = useState({})
  const { user, setuser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submithandler = async (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data)

    if (response.status === 200) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setemail('')
    setpassword('')

  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
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
        <p className='text-center font-semibold'>New here  <Link to="/signup" className='text-blue-600 font-normal'>Create New Account</Link></p>
      </div>

      <div>
        <Link to='/captain-login'
          className='bg-[#10b467] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
        >
          Sign in as captain
        </Link>
      </div>
    </div >
  )
}
