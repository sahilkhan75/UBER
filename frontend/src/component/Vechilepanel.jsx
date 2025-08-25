import React from 'react'

export default function Vechilepanel(props) {


    return (
        <div>
            <h5 onClick={() => {
                props.setvechilePanel(false)
            }} className='p-1 text-center absolute top-0 w-[90%]'><i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>

            <div onClick={() => {
                props.setconfirmRidepanel(true)
            }} className='flex border-2 mb-2 active:border-black  rounded-xl w-full  justify-between items-center p-3'>
                <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='w-1/2 '>
                    <h4 className='font-bold text-lg'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h4 className='font-medium text-sm'>2 mins away</h4>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides </p>
                </div>
                <h2 className='text-xl font-semibold'>₹193.20</h2>
            </div>


            <div onClick={() => {
                props.setconfirmRidepanel(true)
            }} className='flex border-2 mb-2 active:border-black rounded-xl w-full  justify-between items-center p-3'>
                <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2 '>
                    <h4 className='font-bold text-lg'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h4 className='font-medium text-sm'>3 mins away</h4>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides </p>
                </div>
                <h2 className='text-xl font-semibold'>₹65.17</h2>
            </div>

            <div onClick={() => {
                props.setconfirmRidepanel(true)
            }} className='flex border-2 mb-2 active:border-black  rounded-xl w-full  justify-between items-center p-3'>
                <img className='h-14' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2 '>
                    <h4 className='font-bold text-lg'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h4 className='font-medium text-sm'>2 mins away</h4>

                </div>
                <h2 className='text-xl font-semibold'>₹118.27</h2>
            </div>
        </div>
    )
}
