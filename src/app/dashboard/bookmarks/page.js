"use client"

import BookmarkCard from "@/components/bookmarkcard"
import LoginNav from "@/components/loginnav"
import { getCookie } from "@/utils/cookies"
import Head from "next/head"
import { useEffect, useState } from "react"


export default function Bookmarks() {

    const [bookmarkData, setBookmarkData] = useState({bookmarks: []})

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch(`/api/bookmarks/getuserbookmarks?token=${getCookie("auth_token")}`, {
                method: "GET"
            })

            const respData = await resp.json()
            setBookmarkData(await respData)
        }

        getData()
    }, [])

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
                    <div className="flex justify-center items-center mt-15">
                        <h1 className="text-center text-4xl sm:text-7xl p-2 border-4 rounded-4xl">Bookmarks</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-10 space-y-5">
                    {bookmarkData.bookmarks.length > 0 && bookmarkData.bookmarks.map((bookmark) => (
                        <BookmarkCard key={bookmark.id} bookmarkData={bookmark}/>
                    ))}
                </div>
            </div>
        </>
    )
}