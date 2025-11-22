import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import User from "@/model/User";
import Payment from "@/model/Payment";
import connectDb from "@/app/db/connnectDb";


const authOptions = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // ...add more providers
    ],
    callbacks: {
        async signIn({ user, account, profile, email }) {
            if (account.provider === 'github') {
                await connectDb()

                const userEmail = user?.email || profile?.email || email
                if (!userEmail) {
                    console.error("GitHub OAuth did not return an email. Ensure your GitHub account has a public or verified email.")
                    return '/login?error=NoGithubEmail'
                }

                const currentUser = await User.findOne({ email: userEmail })
                if (!currentUser) {
                    const newUser = await User.create({
                        email: userEmail,
                        username: userEmail.split('@')[0],
                    })
                }
            }
            return true
        },
        async session({ session, token, user }) {
            await connectDb()
            const dbUser = await User.findOne({ email: session.user.email })
            session.user.name = dbUser.username
            return session;
        }
    }
})

export { authOptions as GET, authOptions as POST }