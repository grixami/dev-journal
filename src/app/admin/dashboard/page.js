"use client";

import LoginNav from "@/components/loginnav"
import Head from "next/head"
import AdminManageUserProfile from "@/components/admin/userprofile"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // ensures the messages like "NoUserFound" dont show up for a split second
    

    const searchParams = useSearchParams()
    const usernameSearch = searchParams.get("username")
    const testNum = 16;
    
    useEffect(() => {
        fetch(`/api/user/getuserlistwithstart?username=${usernameSearch}&pfp=0`)
            .then((resp) => resp.json())
            .then((data) => {
                setUserInfo(data)
                setIsLoading(false)
            })

            
    }, [usernameSearch])

    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <LoginNav/>
                <form>
                    <input>
                    </input>
                </form>

                <div className="flex flex-row items-center justify-center">
                    <div>
                        <form className="flex flex-row">
                            <input type="text" defaultValue={usernameSearch} placeholder="username..." name="username" className="border border-white focus:border-[#5a9ef9] focus:outline-none rounded-lg p-3"></input>
                            <button type="submit" className="border-2 rounded-full px-3 py-3 ml-3 duration-300 transition-transform ease-in-out hover:bg-[#35383d] hover:scale-110 hover:rotate-30 cursor-pointer">
                                <Image
                                className="dark:invert"
                                src="/assets/img/searchicon.svg"
                                width={30}
                                height={30}
                                alt="search icon"
                                />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="px-20">
                    <div className="grid grid-cols-3 gap-15 mt-5">
                    {userInfo != null && userInfo.map((user) => (
                        <AdminManageUserProfile key={user.id} userId={user.id} username={user.username} bio={user.bio}/>
                    ))}
                    </div>
                </div>
                {usernameSearch == null && isLoading == false && (
                    <div className="flex items-center justify-center pt-[20vh]">
                        <div className="bg-[#35383d] px-10 py-10 rounded-4xl border">
                            <h1 className="text-7xl">Please search for a user above</h1>
                        </div>
                    </div>
                )}
                {userInfo == null && usernameSearch != null && isLoading == false && (
                    <div className="flex items-center justify-center pt-[20vh]">
                        <div className="bg-[#35383d] px-10 py-10 rounded-4xl border">
                            <h1 className="text-7xl">No users Found</h1>
                        </div>
                    </div>
                )}
                
            </div>
        </>
    )
}