import React from 'react'
import PaymentPage from '@/compenents/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '../db/connnectDb';
import User from '@/model/User';

const Username = async ({ params }) => {
    const { username } = await params;

    const checkUser = async () => {
        await connectDb()
        let user = await User.findOne({ username: username })
        if (!user) {
            return notFound()
        }
    }
    await checkUser()

    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username

export const generateMetadata = async ({ params }) => {
    const { username } = await params;
    return {
        title: `${username} - Get Me A Chai`
    }
}