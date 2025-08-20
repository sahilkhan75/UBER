import React, { createContext, use, useState } from 'react'
export const UserDataContext = createContext()

export default function UserContext({ children }) {

    const [user, setuser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        }
    })


    return (
        <div>
            <UserDataContext.Provider value={{ user, setuser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}
