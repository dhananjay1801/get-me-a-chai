'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayments } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'

const PaymentPage = ({ username }) => {

    const [paymentForm, setPaymentForm] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get('paymentdone')) {
            toast('Payment done!', {
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
        router.push(`${username}`)
    }, [])

    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchUser(username)
        setCurrentUser(u)
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentForm)
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js" />


            {/* [username]/page.js */}
            <div className='cover w-full relative'>
                <img src={currentUser.coverPic} alt="cover" className=' w-full h-[200px] sm:h-[300px] object-cover' />

                <div className='absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-[45%] sm:translate-x-0 border-white border-2 rounded-xl size-28 sm:size-32 overflow-hidden'>
                    <img src={currentUser.profilePic} alt="profile" width={128} height={128} className='rounded-xl w-full h-full object-cover' />
                </div>
            </div>

            <div className="info flex justify-center items-center py-24 flex-col gap-2 px-4 text-center">
                <div className='text-base sm:text-lg font-bold'>
                    @{username}
                </div>
                <div className='text-slate-400 text-sm sm:text-base'>
                    Let&apos;s help {username} to get a chai!
                </div>
                <div className='text-slate-400 mb-10 text-sm sm:text-base'>
                    {currentUser.name} has raised ₹{payments.reduce((sum, p) => sum + p.amount, 0) / 100} via {payments.length} payments. 
                </div>

                <div className="payment flex flex-col lg:flex-row gap-3 w-full lg:w-[80%]">
                    <div className="supporters w-full lg:w-1/2 bg-slate-900 rounded-lg text-white p-6 sm:p-10">
                        {/* Show ist of all the supporters as a leaderboard */}
                        <h2 className="text-2xl font-bold my-5">
                            Top 4 Supporters
                        </h2>
                        <ul className='mx-0 sm:mx-5 text-sm sm:text-lg text-left'>
                            {payments.length === 0 && <li>No Payments yet.</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avatar" className='flex-shrink-0' />
                                    <span className='break-words'>
                                        {p.name} donated <span className='font-bold'>₹{p.amount / 100}</span> with a message &ldquo;{p.message}&ldquo;
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment w-full lg:w-1/2 bg-slate-900 rounded-lg text-white p-6 sm:p-10">
                        <h2 className='text-xl sm:text-2xl font-bold my-5 text-left'>Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            {/* Input for name and message */}
                            <input onChange={handleChange} value={paymentForm.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800 text-sm sm:text-base' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentForm.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800 text-sm sm:text-base' placeholder='Enter Message' />

                            <input onChange={handleChange} value={paymentForm.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800 text-sm sm:text-base' placeholder='Enter Amount' />

                            <button onClick={() => pay(paymentForm.amount * 100)} type="button" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 disabled:opacity-70 disabled:cursor-not-allowed" disabled={!paymentForm.name?.length || !paymentForm.message?.length}>
                                Pay
                            </button>
                        </div>
                        {/* Or choose from these amounts */}
                        <div className="flex gap-2 mt-5 flex-wrap">
                            <button className="bg-slate-800 p-2 sm:p-3 rounded-lg flex-1 min-w-[90px]" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-2 sm:p-3 rounded-lg flex-1 min-w-[90px]" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="bg-slate-800 p-2 sm:p-3 rounded-lg flex-1 min-w-[90px]" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage