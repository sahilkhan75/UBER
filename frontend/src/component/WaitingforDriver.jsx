import React from 'react'

export default function WaitingforDriver(props) {
    return (
        <div>
            <h5 onClick={() => {
                props.setwaitingforDriver(false)
            }} className='p-1 text-center absolute top-0 w-[90%]'><i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>


            <div className='flex items-center justify-between'>
                <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Sahil khan</h2>
                    <h4 className='text-xl -mt-2 -mb-1 font-semibold'>RJ 37 8181 </h4>
                    <p className='text-sm text-gray-700'>Swift Dzire</p>
                </div>
            </div>


            <div className='flex gap-2 justify-between flex-col items-center '>
                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5  p-3 border-b-2 '>
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h5 className='text-lg font-medium'>565/11-A</h5>
                            <p className='text-gray-600 text-sm'>Kaikondrahalli,Bengluru,Karnataka</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5  p-3 border-b-2 '>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h5 className='text-lg font-medium'>565/11-A</h5>
                            <p className='text-gray-600 text-sm'>Kaikondrahalli,Bengluru,Karnataka</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5  p-3  '>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h5 className='text-lg font-medium'>₹183.20</h5>
                            <p className='text-gray-600 text-sm'>Cash Cash</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
