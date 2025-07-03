"use client"

import LoginNav from "@/components/loginnav"
import Head from "next/head"
import { useEffect, useState } from "react"
import Image from "next/image"
import FollowerLbUser from "@/components/lb/followerlbuser"
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif"
import FollowingLbUser from "@/components/lb/followinglbuser"
import UserPostCount from "@/components/lb/userpostcount"


export default function Leaderboard() {
    const [page, setPage] = useState("Followers")
    const [loadingPage, setLoadingPage] = useState(true)

    const [lbFollowerUsers, setLbFollowerUsers] = useState([])
    const [lbFollowingUsers, setLbFollowingUsers] = useState([])
    const [lbPostUsers, setLbPostUsers] = useState([])

    useEffect(() => {

       getFollowersLb()

    }, [])

    const getFollowersLb = async () => {
        setLoadingPage(true)
        setPage("Followers")

        if(lbFollowingUsers.length != 0) {
            setLoadingPage(false)
            return
        }

        const resp = await fetch("/api/leaderboard/followers", {
            method: "GET"
        })

        const json = await resp.json()
        setLbFollowerUsers(json)
        setLoadingPage(false)
    }

    const getFollowingLb = async () => {
        setLoadingPage(true)
        setPage("Following")

        if(lbFollowingUsers.length != 0) {
            setLoadingPage(false)
            return
        }

        const resp = await fetch("/api/leaderboard/following", {
            method: "GET"
        })

        const json = await resp.json()
        setLbFollowingUsers(json)
        setLoadingPage(false)
    }

    const getPostsLb = async () => {
        setLoadingPage(true)
        setPage("Posts")

        if(lbPostUsers.length != 0) {
            setLoadingPage(false)
            return
        }

        const resp = await fetch("/api/leaderboard/userpostcount", {
            method: "GET"
        })

        const json = await resp.json()
        setLbPostUsers(json)
        setLoadingPage(false)
    }

    return (
        <>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
            <LoginNav/>
            {!loadingPage ? (
                <div className="mt-5 space-y-4">
                    <div className="flex justify-center items-center">
                        <h1 className="sm:text-7xl text-5xl sm:p-5 p-2 border-3 rounded-3xl">{page} Leaderboard</h1>
                    </div>
                    <div className="flex space-x-3 items-center justify-center">
                        <button className="p-2 border-2 rounded-2xl transition-transform duration-300 hover:scale-105 text-lg hover:bg-[#35383d] hover:cursor-pointer"
                        onClick={() => getFollowersLb()}>Followers Leaderboard</button>
                        <button className="p-2 border-2 rounded-2xl transition-transform duration-300 hover:scale-105 text-lg hover:bg-[#35383d] hover:cursor-pointer"
                        onClick={() => getFollowingLb()}>Following Leaderboard</button>
                        <button className="p-2 border-2 rounded-2xl transition-transform duration-300 hover:scale-105 text-lg hover:bg-[#35383d] hover:cursor-pointer"
                        onClick={() => getPostsLb()}>Posts Leaderboard</button>
                    </div>
                    {page == "Followers" ? (
                    <div className="flex flex-col justify-center items-center my-5 space-y-3">
                        {lbFollowerUsers.length > 0 && lbFollowerUsers.map((user) => (
                            <FollowerLbUser key={user.id} user={user}/>
                        ))}
                    </div>
                    ) : page == "Following" ? (
                    <div className="flex flex-col justify-center items-center my-5 space-y-3">
                        {lbFollowingUsers.length > 0 && lbFollowingUsers.map((user) => (
                            <FollowingLbUser key={user.id} user={user}/>
                        ))}
                    </div>
                    ) : page == "Posts" ? (
                    <div className="flex flex-col justify-center items-center my-5 space-y-3">
                        {lbPostUsers.length > 0 && lbPostUsers.map((user) => (
                            <UserPostCount key={user.id} user={user}/>
                        ))}
                    </div>
                    ) : (
                        <p>Todo</p>
                    )}

                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <TransparrentLoadingGif width={250} height={250}/>
                </div>
            )}

        </div>
        </>
    )
} 