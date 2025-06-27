
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { use } from "react";
import LoginNav from "@/components/loginnav";
import SearchUserProfile from "@/components/searchuserprofile";

export default function UserFollowers({ params }) {
    const [followerData, setFollowerData] = useState(null)
    const { id } = use(params)

    useEffect(() => {
        const getFollowerData = async () => {
            const resp = await fetch(`/api/user/getfollowers?id=${id}`)
            const data  = await resp.json()
            setFollowerData(data)
        }

        getFollowerData()
        
    }, [id])

    return (
    <>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
            <LoginNav/>
            <div className="flex items-center justify-center">
                <h1 className="text-7xl mt-5 border-4 rounded-4xl p-2">Followers</h1>
            </div>
            <div className="flex justify-center items-center mt-10">
                {followerData && followerData.map((follower) => (
                    <div key={follower.id} className="w-2/3">
                        <SearchUserProfile userId={follower.follower.id} username={follower.follower.username} bio={follower.follower.bio} pfp={follower.follower.profilepic}/>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}