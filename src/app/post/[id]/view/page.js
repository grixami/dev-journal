"use client";

import { use, useEffect, useState } from "react"
import RenderMarkdown from "@/components/md/mdrender";
import LoginNav from "@/components/loginnav";

export default function ViewPost({ params }) {
    const { id } = use(params)
    const [postData, setPostData] = useState(null)
    const [viewPretty, setViewPretty] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const resp = await fetch(`/api/post/getpost?id=${id}`, {
                method: "GET",
            });

            if (!resp.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await resp.json();
            setPostData(data);
      } catch (error) {
        
      }
      setLoading(false)
        }
        fetchPost()
    }, [id])

    return (
        <>
        <LoginNav/>
            {postData ? (
            <div>
                <div className=" w-3/5 my-[3%] ml-[3%] rounded-3xl inline-block border-3 p-5">
                    <div className="flex flex-row justify-center items-start space-x-3">
                        <a href={`/user/${postData?.authorId}/profile`} className="p-2">
                            <p className="text-2xl text-blue-800 mb-4">By: {postData?.author.username}</p>
                        </a>
                        {viewPretty == true ? (
                            <button className="bg-[#010409] p-2 rounded-3xl border-2 transition-transform duration-300 hover:bg-[#35383d] hover:scale-105 hover:cursor-pointer"
                            onClick={() => setViewPretty(false)}>
                                <p className="text-2xl">View Raw</p>
                            </button>
                        ) : (
                            <button className="bg-[#010409] p-2 rounded-3xl border-2 transition-transform duration-300 hover:bg-[#35383d] hover:scale-105 hover:cursor-pointer"
                            onClick={() => setViewPretty(true)}>
                                <p className="text-2xl">View Pretty</p>
                            </button>
                        )}


                    </div>
                    <h1 className="text-7xl break-words font-bold mb-4">{postData?.title}</h1>
                    <p className="text-xl break-words">{Buffer.from(postData.desc, 'base64').toString()}</p>
                </div>

                <div className="p-10">
                    {viewPretty ? (
                        <RenderMarkdown contentParam={Buffer.from(postData.content, 'base64').toString()} />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: `<pre>${Buffer.from(postData.content, 'base64').toString()}</pre>` }} />
                    )}

                    
                </div>
            </div>
            ) : (

            <div>
                {!loading ? (
                    <p className="text-center absolute top-1/2 left-1/2 text-9xl -translate-x-1/2 -translate-y-full ">Post does not exist</p>
                ) : (
                    <p className="text-center absolute top-1/2 left-1/2 text-9xl -translate-x-1/2 -translate-y-full ">Loading...</p>
                )}
                
            </div>
            
            )}
        </>
    )
}