import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/model/Payment";
import connectDb from "@/app/db/connnectDb";
import User from "@/model/User";

export const POST = async (req) => {
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if razorpay order Id is present on the server
    let p = await Payment.findOne({oId: body.razorpay_order_id});

    if(!p){
        return NextResponse.json({success: false, message: "Order Id not found"}); 
    }

    let user = await User.findOne({username: p.toUser})
    const secret = user.razorpaySecret

    // verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id},body.razorpay_signature, secret)

    if(xx){
        // update payment status
        const updatedPayment = await Payment.findOneAndUpdate({oId: body.razorpay_order_id}, {done: true}, {new: true})
        if (!updatedPayment) {
            return NextResponse.json({success: false, message: "Payment record not found"}, {status: 404})
        }
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.toUser}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false, message: "Payment verification failed"})
    }

}