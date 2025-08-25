import React from 'react'

export default function LocationSearchPanel(props) {
    // console.log(props)

    const locations = [
        "Kayam Nagar gli no.1 , Didwana, Rajasthan",
        "Ajmeri gate  , Didwana, Rajasthan",
        "Naguri gate , Didwana, Rajasthan",
        "Ganesh ji mandir , Didwana, Rajasthan",

    ]


    return (
        <div>
            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setvechilePanel(true)
                        props.setpanelopen(false)

                    }} className='flex justify-start border-2 p-3 border-gray-100 active:border-black rounded-xl  items-center gap-2 my-4'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full ' ><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{ }</h4>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>

                })
            }

        </div>
    )
}
