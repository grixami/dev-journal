"use client";

import { use, useEffect, useState } from "react"
import RenderMarkdown from "@/components/md/mdrender";
import LoginNav from "@/components/loginnav";
import { getCookie } from "@/utils/cookies";
import Comment from "@/components/comment/comment";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import Image from "next/image";
import Head from "next/head";

export default function ViewPost({ params }) {
    const { id } = use(params)
    const [postData, setPostData] = useState(null)
    const [viewPretty, setViewPretty] = useState(true)
    const [loading, setLoading] = useState(true)
    const [commentData, setCommentData] = useState(null)
    const [commentSending, setCommentSending] = useState(false)

    const [commentResponse, setCommentResponse] = useState(null)
    const [currentLocation, setCurrentLocation ] = useState("")

    useEffect(() => {
        setCurrentLocation(window.location)
        const fetchPost = async () => {
            try {
                const postDataResp = await fetch(`/api/post/getpost?id=${id}&view=1`, {
                    method: "GET",
                });

                const postData = await postDataResp.json();
                setPostData(postData);

                const commentDataResp = await fetch(`/api/comment/getcomments?id=${id}`, {
                    method: "GET",
                });

                const commentData = await commentDataResp.json();
                setCommentData(commentData.comments);
      } catch (error) {
            
      }
      setLoading(false)
        }
        fetchPost()
    }, [id])

    const copyUrl = () => {
        navigator.clipboard.writeText(currentLocation)
        const popup = document.getElementById("copyurlpopup")
        popup.hidden = false
        setTimeout(() => {
            popup.hidden = true
        }, 2500)
    }


    const postComment = async () => {
        setCommentSending(true)
        const commentBox = document.getElementById("commentbox")

        const resp = await fetch("/api/comment/postcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                content: commentBox.value,
                postId: id
            })
        })

        const data = await resp.json()
        
        if(resp.status == 200) {
            setCommentResponse(data.message)
        }
        if(resp.status != 200) {
            if(resp.status == 429) {
                setCommentResponse("You are being ratelimited")
            }
        }
        

        setCommentSending(false)
    }

    const exportPost = () => {
        let text = Buffer.from(postData.content, 'base64').toString()
        let blob = new Blob([text], {type: "text/plain"})
        let link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `${postData.title.split(" ").join("_")}.md`
        link.click()
    }

    return (
        <div>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={postData?.title}></meta>
            <meta property="og:url" content={currentLocation}></meta>
            <meta property="og:description" content={postData?.desc}></meta>
        </Head>
        <LoginNav/>
            {postData ? (
            <div>
                <div id="copyurlpopup" hidden>
                    <div className="absolute left-1/2 top-1/10 bg-green-500 p-2 rounded-3xl border-2 ">
                        <p className="text-xl">Copied Url</p>
                    </div>
                </div>

                <div className="w-3/5 my-[3%] ml-[3%] rounded-3xl border-3 p-5 hidden sm:inline-block"> {/* desktop layout */}
                    <div className="flex justify-between">
                        <div className="">
                            <button className="bg-[#010409] p-2 rounded-3xl border-2 transition-transform duration-300 hover:bg-[#35383d] hover:scale-105 hover:cursor-pointer"
                            onClick={() => exportPost()}>
                                <p className="text-2xl">Export Post</p>
                            </button>
                        </div>
                        <div className="justify-end items-end">
                            <Image
                                className="dark:invert hover:cursor-pointer"
                                src="/assets/img/share.png"
                                alt=""
                                width={50}
                                height={50}
                                onClick={() => copyUrl()}
                            />
                        </div>
                    </div>

                


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

                    <div className="flex flex-col lg:flex-row items-center justify-center space-x-5">
                        <h1 className="text-7xl break-all font-bold mb-4">{postData?.title}</h1>
                        <div className="border-2 rounded-4xl">
                            <div className="flex items-center justify-center p-2">
                                <Image
                                className="dark:invert"
                                src="/assets/img/eyeicon.png"
                                alt=""
                                width={50}
                                height={50}
                                />
                                <p className="ml-3">{postData?.views}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-5"></hr>
                    <p className="text-xl break-words">{Buffer.from(postData.desc, 'base64').toString()}</p>
                </div>
                
                
                <div className="w-11/12 my-[3%] ml-[3%] rounded-3xl border-3 p-5 inline-block sm:hidden"> {/* Mobile layout */}
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

                    <div className="flex flex-col lg:flex-row items-center justify-center space-x-5">
                        <h1 className="text-4xl break-words font-bold mb-4 mt-2">{postData?.title}</h1>
                        <div className="border-2 rounded-4xl">
                            <div className="flex items-center justify-center p-3">
                                <Image
                                className="dark:invert"
                                src="/assets/img/eyeicon.png"
                                alt=""
                                width={40}
                                height={40}
                                />
                                <p className="ml-3">{postData?.views}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-5"></hr>
                    <p className="text-lg break-words">{Buffer.from(postData.desc, 'base64').toString()}</p>
                </div>
                    
            <div className="p-10">
                {viewPretty ? (
                    <RenderMarkdown contentParam={Buffer.from(postData.content, 'base64').toString()} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: `<pre>${Buffer.from(postData.content, 'base64').toString()}</pre>` }} />
                )}
            </div>

            <hr className="border-2"></hr>

            <div className="mt-10 sm:ml-10">
                <div className="flex flex-col">
                    <div className="flex justify-start">
                        <div className="flex flex-col space-y-3">
                            <textarea id="commentbox" className="p-2 rounded-2xl resize-none border-2 w-[150%] sm:w-[200%] h-30 focus:border-[#5a9ef9] focus:outline-none" maxLength={100}>

                            </textarea>
                            {commentSending ? (
                                <TransparrentLoadingGif/>
                            ) : (
                            <button className="bg-black p-2 rounded-3xl border-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                            onClick={() => postComment()}>
                                <p>add comment</p>
                            </button>
                            )}

                        </div>
                        
                    </div>
                    {commentResponse && (
                    <div id="commentrespbox" className={`inline-flex max-w-lg ${commentResponse == "sucess" ? ("bg-green-500") : ("bg-red-500")} p-2 rounded-2xl mt-2`}>
                        <h2 className="text-3xl">{commentResponse == "sucess" ? ("") : ("Error: ")} {commentResponse}</h2>
                    </div>
                    )}

                    <div className="pt-10 flex flex-col space-y-7 w-4/5 sm:w-auto">
                    {commentData && commentData.map(comment => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                    </div>
                </div>
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
        </div>
    )
}