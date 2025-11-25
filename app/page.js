import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="flex justify-center items-center gap-4 flex-col text-white h-[44vh] px-4 text-center">
                <div className="font-bold text-3xl sm:text-4xl md:text-5xl flex gap-2 justify-center items-center flex-wrap">
                    Buy Me A Chai
                    <span><img className="invertImg" src="tea.gif" alt="tea gif" width={88} /></span>
                </div>
                <p className="text-sm sm:text-base px-2">
                    A crowdfunding platform for creators. Get funded by your fans and followers. Start Now!
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                    <Link href={'/login'}>
                        <button type="button" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5">
                            Start Here
                        </button>
                    </Link>
                    <Link href={'/about'}>
                        <button type="button" className="rounded-lg text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5">
                            Read More
                        </button>
                    </Link>
                </div>

            </div>
            <div className="bg-white h-1 opacity-10"></div>

            <div className="text-white container mx-auto pb-32 pt-14 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">Your fans can buy you a Chai</h2>
                <div className="flex flex-col md:flex-row gap-5 justify-around items-center">
                    <div className="item space-y-3 flex flex-col items-center justify-center max-w-[260px] text-center">
                        <img className="bg-slate-400 text-black rounded-full p-2" src="man.gif" alt="man" width={88} />
                        <p className="font-bold ">Fans want to help</p>
                        <p className="text-center">Your fans are available for you to support you</p>
                    </div>
                    <div className="item space-y-3 flex flex-col items-center justify-center max-w-[260px] text-center">
                        <img className="bg-slate-400 text-black rounded-full p-2" src="coin.gif" alt="man" width={88} />
                        <p className="font-bold ">Fans want to contribute</p>
                        <p className="text-center">Your fans are willing to contribute financially</p>
                    </div>
                    <div className="item space-y-3 flex flex-col items-center justify-center max-w-[260px] text-center">
                        <img className="bg-slate-400 text-black rounded-full p-2" src="group.gif" alt="man" width={88} />
                        <p className="font-bold ">Your fans want to collaborate</p>
                        <p className="text-center">Your fans are ready to collaborate with you</p>
                    </div>
                </div>
            </div>

            <div className="bg-white h-1 opacity-10"></div>

            <div className="text-white container mx-auto pb-32 pt-14 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">Thanks for helping us</h2>
                <div className="flex gap-5 justify-around">

                    <video src="home_page_video.mp4" controls muted autoPlay className="rounded-xl w-full max-w-[500px]"></video>
                </div>
            </div>


        </>
    );
}
