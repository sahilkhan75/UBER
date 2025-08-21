import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

export default function Home() {

    const [pickup, setpickup] = useState('')
    const [destination, setdestination] = useState('')
    const [panelopen, setpanelopen] = useState(false)
    const panelRef = useRef(null)
    const panelcloseRef = useRef(null)


    const submithandler = () => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelopen) {
            gsap.to(panelRef.current, {
                height: '70%'
            })
            gsap.to(panelcloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%'
            })
            gsap.to(panelcloseRef.current, {
                opacity: 0
            })

        }

    }, [panelopen])




    return (
        <div className='h-screen relative'>
            <img className='w-16 absolute left-5 top-5' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />

            <div className='h-screen w-screen'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className=' absolute h-screen top-0 w-full flex flex-col justify-end '>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelcloseRef} onClick={() => {
                        setpanelopen(false)
                    }} className='absolute opacity-0 top-6 right-5 text-2xl '>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form onSubmit={(e) => {
                        submithandler(e)
                    }} >
                        <div className='w-1 h-14 bg-gray-800 rounded absolute left-10 top-[40%] '></div>
                        <input
                            onClick={() => {
                                setpanelopen(true)
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setpickup(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-2 '
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setpanelopen(true)
                            }}
                            value={destination}
                            onChange={(e) => {
                                setdestination(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-2'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                </div>
                <div ref={panelRef} className=' bg-red-500 h-0' >

                </div>
            </div>

        </div>

    )
}
