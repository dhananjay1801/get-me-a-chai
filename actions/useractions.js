'use server'

import razorpay from 'razorpay'
import Payment from '@/model/Payment'
import User from '@/model/User'
import connectDb from '@/app/db/connnectDb'


export const initiate = async (amount, toUser, paymentForm) => {
    await connectDb()
    let user = await User.findOne({username: toUser})
    const secret = user.razorpaySecret
    const id = user.razorpayId

    var instance = new razorpay(
        {
            key_id: id,
            key_secret: secret
        }
    )

    instance.orders.create({
        amount: 5000,
        currency: 'INR',
        receipt: "receipt#1",
        notes: {
            key1: "value1",
            key2: "value2",
        }
    })

    let options = {
        amount: Number.parseInt(amount),
        currency: 'INR',
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment
    await Payment.create({ oId: x.id, amount: amount, toUser: toUser, name: paymentForm.name, message: paymentForm.message })

    return x;
}

export const fetchUser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) return null
    let user = u.toObject({ flattenObjectIds: true })
    // Convert to plain object for client component compatibility
    return JSON.parse(JSON.stringify(user))
}

export const fetchPayments = async (username) => {
    await connectDb()
    // find top 4 payments by decreasing order of amount and flatten the object ids
    let p = await Payment.find({ toUser: username, done: true }).sort({ amount: -1 }).limit(4).lean()
    // Convert to plain objects for client component compatibility
    return JSON.parse(JSON.stringify(p))
}

export const fetchPaymentStats = async (username) => {
    await connectDb()
    // Get all payments to calculate total amount and count
    let allPayments = await Payment.find({ toUser: username, done: true }).lean()
    let totalAmount = allPayments.reduce((sum, p) => sum + p.amount, 0)
    let totalCount = allPayments.length
    return { totalAmount, totalCount }
}

export const updateProfile = async (data, oldUsername) => {
    await connectDb()
    let nData = Object.fromEntries(data)
    // if the username is being updated, check if the username is available
    if (nData.username !== oldUsername) {
        let u = await User.findOneAndUpdate({ username: nData.username })
        if(u){
            return {success: false, message: "Username already exists"}
        }
    }
    await User.updateOne({email: nData.email}, nData)
    return {success: true, message: "Profile updated successfully"}
}