import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

export default function CaptainSignup() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [userdata, setuserdata] = useState({})
  const { captain, setCaptain } = useContext(CaptainDataContext)


  const [vechilecolor, setVechilecolor] = useState('');
  const [vechiletype, setVechiletype] = useState('');
  const [vechilecapacity, setVechilecapacity] = useState('');
  const [vechileplate, setVechileplate] = useState('');

  const navigate = useNavigate()


  const submithandler = async (e) => {
    e.preventDefault()
    const captaindata = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,

      vechile: {
        color: vechilecolor,
        capacity: vechilecapacity,
        plate: vechileplate,
        vechileType: vechiletype
      }

    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captaindata)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }




    setfirstname('')
    setlastname('')
    setemail('')
    setpassword('')
    setVechilecapacity('')
    setVechilecolor('')
    setVechileplate('')
    setVechiletype('')
  }



  return (
    <div>
      <div className='p-7 flex flex-col justify-between h-screen'>
        <div>
          <img className='w-20' src="https://ih1.redbubble.net/image.5007880594.5940/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="" />
          <form onSubmit={(e) => submithandler(e)} className='flex flex-col '>

            <h3 className='text-xl w-full font-medium mb-2 '>what's our captain Name</h3>
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

            <h3 className='text-xl font-medium mb-2 mt-4'>what's our captain  Email</h3>
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


            <h3 className='text-xl font-medium mb-2'>Vehicle Information</h3>
            <div className='flex flex-col gap-3 mb-6'>
              <div className='flex gap-3'>
                <input
                  required
                  className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                  type="text"
                  placeholder='Vehicle Color'
                  value={vechilecolor}
                  onChange={(e) => setVechilecolor(e.target.value)}
                />
                <select
                  required
                  className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg'
                  value={vechiletype}
                  onChange={(e) => setVechiletype(e.target.value)}
                >
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
              <input
                required
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="number"
                min="1"
                placeholder='Vehicle Capacity'
                value={vechilecapacity}
                onChange={(e) => setVechilecapacity(e.target.value)}
              />
              <input
                required
                className='bg-[#eeeeee] rounded px-2 py-2 border w-full text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Plate Number'
                value={vechileplate}
                onChange={(e) => setVechileplate(e.target.value)}
              />
            </div>


            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2  w-full text-lg placeholder:text-sm'
            >Create Captain account
            </button>
          </form>
          <p className='text-center font-semibold'>Allready have a account <Link to="/captain-login" className='text-blue-600 font-normal'>Login here</Link></p>
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
