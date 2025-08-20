import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

export default function UserSignup() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [userdata, setuserdata] = useState({})
  const { user, setuser } = useContext(UserDataContext)

  const navigate = useNavigate()

  const submithandler = async (e) => {
    e.preventDefault()
    const newuser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newuser)

    if (response.status === 201) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setfirstname('')
    setlastname('')
    setemail('')
    setpassword('')
  }



  return (
    <div>
      <div className='p-7 flex flex-col justify-between h-screen'>
        <div>
          <img className='w-20' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
          <form onSubmit={(e) => submithandler(e)} className='flex flex-col mt-5'>

            <h3 className='text-xl font-medium mb-2 '>Enter Your Name</h3>
            <div className='flex  gap-2 '>
              <input
                required
                className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
                type="text"
                placeholder='first name'
                value={firstname}
                onChange={(e) => {
                  setfirstname(e.target.value)
                }}
              />
              <input
                className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                type="text"
                placeholder='last name'
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value)
                }}
              />
            </div>

            <h3 className='text-xl font-medium mb-2 mt-4'>Enter Your Email</h3>
            <input
              required
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              value={email}
              onChange={(e) => {
                setemail(e.target.value)
              }}
            />

            <h3 className='text-xl font-medium mb-2'> Enter Password</h3>
            <input
              required
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => {
                setpassword(e.target.value)
              }}
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
            >Create account
            </button>
          </form>
          <p className='text-center font-semibold'>Allready have a account <Link to="/login" className='text-blue-600 font-normal'>Login here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight text-center' >
            this site is proteccted by reCAPTCHA and the Google <span className='text-blue-600'>Privacy Policy</span> and <span className='text-blue-600'>Terms of Service</span> apply.
          </p>
        </div>
      </div >
    </div>
  )
}
