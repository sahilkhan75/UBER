import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {


  return (
    <div>
      <div className=' bg-cover bg-no-repeat bg-center  bg-[url(https://images.unsplash.com/photo-1574853792871-8a8d2f4df893?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  w-full flex justify-between flex-col'>
        <img className='w-16 ml-8' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to={"/login"} className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5' >Continue</Link>
        </div>
      </div>
    </div>
  )
}