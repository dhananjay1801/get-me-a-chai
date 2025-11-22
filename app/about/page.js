import Link from "next/link";

const About = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-4 flex-col text-white h-[44vh]">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center">
          About Get Me A Chai
          <span><img className="invertImg" src="tea.gif" alt="tea gif" width={88}/></span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">What is Get Me A Chai?</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg">
            Get Me A Chai is a simple and elegant crowdfunding platform designed for creators, artists, developers, and content makers. 
            We help you monetize your passion by allowing your community to support your work directly.
          </p>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>
        <div className="flex gap-5 justify-around flex-wrap">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 text-black rounded-full p-2" src="man.gif" alt="man" width={88}/>
            <p className="font-bold">Create Your Profile</p>
            <p className="text-center">Sign up and customize your profile with your username, photos, and Razorpay details</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 text-black rounded-full p-2" src="coin.gif" alt="coin" width={88}/>
            <p className="font-bold">Share Your Link</p>
            <p className="text-center">Share your profile link with your audience and start receiving support</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 text-black rounded-full p-2" src="group.gif" alt="group" width={88}/>
            <p className="font-bold">Grow Your Community</p>
            <p className="text-center">Watch your supporters contribute and help you achieve your goals</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <Link href={'/login'}>
          <button type="button" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5">
            Start Here
          </button>
        </Link>
      </div>
    </>
  )
}

export default About

export const metadata = {
    title: 'About - Get Me A Chai'
    
}