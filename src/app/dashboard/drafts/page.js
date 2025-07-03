"use client";

import Head from "next/head"
import { useEffect, useState } from "react"
import LoginNav from "@/components/loginnav"
import { getCookie } from "@/utils/cookies";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import ProfilePost from "@/components/profilepost";
import PostDraft from "@/components/postdraft";
export default function Drafts() {
    const [draftData, setDraftData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getDrafts() {
            const resp = await fetch(`/api/user/getdrafts?token=${getCookie("auth_token")}`)
            const data = await resp.json()
            setDraftData(data)
            setLoading(false)
        }

        getDrafts()

        
    }, [])
    
    const deleteDraft = async (postId) => {
        setDraftData(prevData => ({...prevData, posts: prevData.posts.filter(post => post.id != postId)}))
        const resp = await fetch("/api/post/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                id: postId
            })
        })


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
               
            
            { !loading ? (
                <div className="flex justify-center items-center">
                <div className=" w-4/5 sm:w-3/5 md:1/2 mt-10">
                    <div className="border-2 border-white rounded-xl px-5 py-5">
                        <h2 className="text-4xl text-center">Posts</h2>
                    </div>
                    
                    {!loading && draftData && draftData.posts.length > 0 && draftData.posts.map((draft) => (
                        <div key={draft.id}>
                            <PostDraft postDesc={draft.desc} postId={draft.id} postTitle={draft.title} deleteDraft={deleteDraft}/>
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-1/2">
                <TransparrentLoadingGif width={300} height={300}/>
                </div>
            )}
            </div>
            
        </>
    )
}