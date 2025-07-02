"use client"

import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif"
import LoginNav from "@/components/loginnav"
import SearchPost from "@/components/searchpost"
import Head from "next/head"
import { useState, useEffect } from "react"

export default function Explore() {

    const [loading, setLoading] = useState(true)
    const [recentPosts, setRecentPosts] = useState([])
    const [latestPost, setLatestPost] = useState(0)
    const [postsAtOnce, setPostsAtOnce] = useState(5)
    const [searchView, setSearchView] = useState("recent")

    const [moreLoading, setMoreLoading] = useState(false)
    const [noMore, setNoMore] = useState(false)

    useEffect(() => {
        const getFirstPosts = async () => {
            const resp = await fetch(`/api/explore/getrecentposts?from=${latestPost}&count=${postsAtOnce}`)
            const data = await resp.json()

            for(const post of data) {
                setRecentPosts([...recentPosts, ...data]);
            }
            setLatestPost(latestPost + postsAtOnce)
            setLoading(false)
       
        }
        getFirstPosts()

    }, [postsAtOnce]) // do not need to add "posts" and "latestPost" otherwise this runs forever

    const getNewPosts = async () => {
        setMoreLoading(true)
        const resp = await fetch(`/api/explore/getrecentposts?from=${latestPost}&count=${postsAtOnce}`)
        const data = await resp.json()

        if(data.length == 0) {
            setNoMore(true)

        }

        for(const post of data) {
            setRecentPosts([...recentPosts, ...data]);
        }
        setLatestPost(latestPost + postsAtOnce)
        setMoreLoading(false)
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
            <div>
                <div className="mt-10 flex items-center justify-center">
                    <button className="p-2 border-2 rounded-2xl text-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer hover:bg-[#35383d]">Recent</button>
                </div>
            </div>
            {!loading ? (
            <div>
<div className="flex items-center justify-center">
                <div className="w-3/5">
                    {recentPosts.length > 0 && recentPosts.map((post) => (
                        <SearchPost key={post.id} post={post}/>
                    ))}
                </div>

            </div>
            <div className="flex flex-col items-center justify-center">
                {!noMore ? (
                !moreLoading ? (
                    <button className="border-2 p-2 rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer hover:bg-[#35383d]" onClick={() => getNewPosts()}>getnew</button>
                ) : (
                    <TransparrentLoadingGif width={50} height={50}/>
                )
                ) : (
                <div className="bg-red-600 p-2 border-2 rounded-2xl">
                    <p>No more posts</p>
                </div>
                )}

                

            </div>
            </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <TransparrentLoadingGif width={250} height={250}/>
                </div>
            )}
            
        </div>
        </>
    )
}