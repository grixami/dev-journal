"use client";

import { use } from "react";
import { useState, useEffect } from "react";

import Head from "next/head";
import LoginNav from "@/components/loginnav";
import SearchUserProfile from "@/components/searchuserprofile";

export default function UserFollowing({ params }) {
    const { id } = use(params)

    const [follwingData, setFollowingData] = useState(null)

    useEffect(() => {
        const getFollowingData = async () => {
            const resp = await fetch(`/api/user/getfollowing?id=${id}`)
            const respJson = await resp.json()
            setFollowingData(respJson)
        }

        getFollowingData()
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
                    <h1 className="text-7xl mt-5 border-4 rounded-4xl p-2">Following</h1>
                </div>
                <div className="flex justify-center items-center mt-10">
                    {follwingData && follwingData.map((following) => (
                        <div key={following.id} className="w-2/3">
                            <SearchUserProfile userId={following.following.id} username={following.following.username} bio={following.following.bio} pfp={following.following.profilepic}/>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )

}