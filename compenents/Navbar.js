'use client'

import { useSession, signOut } from 'next-auth/react'
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {

    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    return (
        <nav className='bg-gray-900 text-white flex justify-between px-4 h-16 items-center'>

            <Link href={'/'} className="logo font-bold text-lg flex justify-center items-center">
                <img className='invertImg' src="tea.gif" alt="" width={44} />
                <span>Get Me A Chai</span>
            </Link>



            <div className='flex justify-between gap-4 relative'>
                {session && <>
                    <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                        setTimeout(() => {
                            setShowdropdown(false)
                        }, 100);
                    }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 flex items-center" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div 
                        id="dropdown" 
                        className={`z-10 ${showdropdown ? "" : "hidden"} absolute  top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link 
                                    href="/dashboard" 
                                    onClick={() => setShowdropdown(false)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/${session.user.name}`} 
                                    onClick={() => setShowdropdown(false)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Your Page
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={() => {
                                        setShowdropdown(false)
                                        signOut()
                                    }} 
                                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div></>
                }


                {!session &&
                    <Link href={'/login'}>
                        <button type="button" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5">
                            Log In
                        </button>
                    </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar