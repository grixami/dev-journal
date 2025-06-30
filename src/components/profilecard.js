"use client";

import Image from "next/image"
import { getCookie } from "@/utils/cookies"
import { useState } from "react";
import TransparrentLoadingGif from "./gif/transparrentloadinggif";

export default function ProfileCard({userData, editProfile, isFollowing}) {

    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
    const [loading, setLoading] = useState(false)

    const follow = async () => {
        setLoading(true)

        const resp = await fetch("/api/follow/followuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                userId: userData.id
            })
        })

        setLoading(false)
        if(resp.status == 200) {
            setIsFollowingState(true)
        }
    }

    const unfollow = async () => {
        setLoading(true)

        const  resp = await fetch("/api/follow/unfollowuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                userId: userData.id
            })
        })

        if(resp.status == 200) {
            setIsFollowingState(false)
        }
        setLoading(false)
    }

    return(
    <div className="md:w-1/3 w-4/5 mr-auto md:ml-[5%] ml-auto ">
    <div className="border rounded-xl px-5 py-5">
        <div className="flex justify-center">
            {userData?.profilepic ? (
                <Image
                    className="border-2 border-white rounded-full"
                    src={`data:image/png;base64,${userData.profilepic}`}
                    alt="logo"
                    width={200}
                    height={200}
                />
            ) : (
                <Image
                    className="border-2 border-white rounded-full"
                    src="/assets/img/defaultprofile.png"
                    alt="logo"
                    width={200}
                    height={200}
                />
            )}
        </div>
        <div className="h-[2px] bg-[#3d444d] w-full mt-5"></div>
        <h2 className="text-3xl text-start ml-10 mt-3">{userData?.username}</h2>
        <p className="ml-10 break-words">{userData?.bio}</p> {/* Break words used so long words do not go across the boarder */}
        <p className="text-start pl-10 mt-5 text-xs sm:text-lg">Created at - {new Date(userData?.createdAt).toLocaleString()}</p>
        {editProfile ? ( 
            <div className="flex flex-col xl:flex-row">
                <div className="mt-4 ml-10">
                    <a href="/dashboard/editprofile"
                    className="bg-[#3d444d] xl:px-5 px-2 py-2 rounded-xl border hover:bg-[#2c3036]"
                    >Edit Profile</a>
                </div>
                <div className="mt-4 ml-10 xl:ml-5">
                    <a href="/dashboard/drafts"
                    className="bg-[#3d444d] xl:px-5 px-2 py-2 rounded-xl border hover:bg-[#2c3036]"
                    >Drafts</a>
                </div>
                <div className="mt-4 ml-10 xl:ml-5">
                    <a href="/dashboard/questions"
                    className="bg-[#3d444d] xl:px-5 px-2 py-2 rounded-xl border hover:bg-[#2c3036]"
                    >View questions</a>
                </div>
            </div>
        ) : (
            <>
            {!loading ? (
                <div>
                {isFollowingState ? (
                <div className="flex">
                    <div className="mt-4 ml-10">
                        <div className="bg-[#3d444d] px-10 py-2 rounded-xl border hover:bg-[#2c3036] hover:cursor-pointer"
                        onClick={() => unfollow()}>
                            <p>Unfollow</p>
                        </div>
                    </div>
                </div>
                ) : (
                <div className="flex">
                    <div className="mt-4 ml-10">
                        <div className="bg-[#3d444d] px-10 py-2 rounded-xl border hover:bg-[#2c3036] hover:cursor-pointer"
                        onClick={() => follow()}>
                            <p>Follow</p>
                        </div>
                    </div>
                </div>
                )}
                </div>
            ) : (
                <>
                <TransparrentLoadingGif width={100} height={100}/>
                </>
            )}
            
            </>
        )}
        <div className="ml-10 flex-col lg:flex-row inline-flex space-y-2 lg:space-y-0 space-x-4 my-4 ">

            <a href={`/user/${userData.id}/followers`}>
                <div className="bg-black p-2 border-2 rounded-2xl transition-transform duration-300 hover:scale-110">
                    <p>Followers - {userData._count.followers}</p>
                </div>
            </a>
            
            <a href={`/user/${userData.id}/following`}>
                <div className="bg-black p-2 border-2 rounded-2xl transition-transform duration-300 hover:scale-110">
                    <p>Following - {userData._count.following}</p>
                </div>
            </a>
        </div>
        </div>
        
    </div>
    )
}