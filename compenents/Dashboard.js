'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { fetchUser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({});
    const [isDirty, setIsDirty] = useState(false)

    const getData = useCallback(async () => {
        if (!session?.user?.name) return;
        let u = await fetchUser(session.user.name)
        setform(u)
    }, [session])

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return
        }
        if (isDirty) {
            return;
        }

        const fetchProfile = async () => {
            await getData();
        }

        fetchProfile();
    }, [session, router, isDirty, getData]);

    const handleChange = (e) => {
        setIsDirty(true)
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (data) => {
        let a = await updateProfile(data, session.user.name)
        setIsDirty(false);

        toast('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='container mx-auto py-5 px-4 sm:px-6 '>
                <h1 className='text-center my-5 text-2xl sm:text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto px-2 sm:px-0" action={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ?? ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ?? ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input disabled={true} value={form.username ?? ""} onChange={handleChange} type="text" name='username' id="username" className="cursor-not-allowed block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture URL</label>
                        <input value={form.profilePic ?? ""} onChange={handleChange} type="text" name='profilePic' id="profilePic" placeholder='Default: profile.png' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverPic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture URL</label>
                        <input value={form.coverPic ?? ""} onChange={handleChange} type="text" name='coverPic' id="coverPic" placeholder='Default: cover.png' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input value={form.razorpayId ?? ""} onChange={handleChange} type="text" name='razorpayId' id="razorpayId" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaySecret ?? ""} onChange={handleChange} type="text" name='razorpaySecret' id="razorpaySecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="cursor-pointer rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 w-full">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard