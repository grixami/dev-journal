"use client";

import LoginNav from "@/components/loginnav";
import Head from "next/head";
import SearchUserProfile from "@/components/searchuserprofile"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import SearchPost from "@/components/searchpost";
import Image from "next/image";

function Search() {
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [display, setDisplay] = useState("posts")
    const [isLoading, setIsLoading] = useState(true);
    const [noQuery, setNoQuery] = useState(false)
    const searchParams = useSearchParams()
    const query = searchParams.get("query")

    const [tagFilterDropdown, setTagFilterDropdown] = useState(null)
    const [tagFilter, setTagFilter] = useState(null)
    
    const toggleTagFilterDropdown = () => {setTagFilterDropdown(!tagFilterDropdown)}

    useEffect(() => {
        if(query == "") {
            setNoQuery(true)
            setIsLoading(false)
            return
        }
        fetch(`/api/user/getuserlistwithstart?username=${query}&pfp=0`)
            .then(resp => resp.json())
            .then(data => {
                setUserData(data)
            })

        fetch(`/api/post/getpostswithstart?title=${query}`)
            .then(resp => resp.json())
            .then(data => {
                setPostData(data)
                setIsLoading(false)
            })
        
        
    }, [query])

    return (
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="flex flex-col h-screen">
                <LoginNav/>
                {isLoading == false && (
                <div className="flex sm:flex-row space-y-2 sm:space-y-0 flex-col items-center justify-center mt-10 space-x-5">
                    <div className="relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                        <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                        </div>

                        <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer"
                        onClick={() => {setDisplay("users")}}
                        >
                            <p className="text-xl">Users</p>
                        </button>
                    </div>
                    <div className="flex">
                    <div className="relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                        <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                        </div>

                        <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer"
                        onClick={() => {setDisplay("posts")}}
                        >
                            <p className="text-xl">Posts</p>
                        </button>


                    </div>
                        {display == "posts" && (
                            <div className="relative justify-center pl-3">
                                <div className="bg-black px-3 py-2 border-2 rounded-3xl flex hover:cursor-pointer"
                                onClick={toggleTagFilterDropdown}>
                                    <p>Tag Filter</p>
                                    <Image
                                        className="dark:invert pl-2"
                                        alt=""
                                        src="/assets/img/downarrow.png"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                            {tagFilterDropdown && (
                                <div className="absolute top-full mt-2">
                                    <div className="flex flex-col space-y-2 bg-black p-2 rounded-xl">
                                        <div className="bg-cyan-950 border-2 rounded-xl" onClick={() => {setTagFilter(null); toggleTagFilterDropdown()}}>
                                            <button className="p-1">
                                                <p>None</p>
                                            </button>
                                        </div>
                                        <div className="bg-cyan-950 border-2 rounded-xl" onClick={() => {setTagFilter("Other"); toggleTagFilterDropdown()}}>
                                            <button className="p-1">
                                                <p>Other</p>
                                            </button>
                                        </div>
                                        <div className="bg-cyan-950 border-2 rounded-xl" onClick={() => {setTagFilter("Cybersecurity"); toggleTagFilterDropdown()}}>
                                            <button className="p-1 ">
                                                <p>Cybersecurity</p>
                                            </button>
                                        </div>
                                        <div className="bg-cyan-950 border-2 rounded-xl" onClick={() => {setTagFilter("Software Development"); toggleTagFilterDropdown()}}>
                                            <button className="p-1 ">
                                                <p>Software Development</p>
                                            </button>
                                        </div>
                                        <div className="bg-cyan-950 border-2 rounded-xl" onClick={() => {setTagFilter("Robotics"); toggleTagFilterDropdown()}}>
                                            <button className="p-1 ">
                                                <p>Robotics</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        )}
                    </div>
                </div>
                )}
                
                <div className="flex overflow-y-auto scrollbar scrollbar-thumb-white">
                    <div className="flex flex-col space-y-5 mt-10 sm:w-3/5 w-4/5 ml-[10%]">
                    {display == "users" && userData && userData.map(user => (
                        <SearchUserProfile
                            key={user.id}
                            userId={user.id}
                            username={user.username}
                            bio={user.bio}
                            pfp={user.profilepic}
                        />
                        ))
                    }
                    {display == "posts" && postData && postData.map(post => (
                        <div key={post.id}>
                            {tagFilter && post.postTag == tagFilter && (
                                <SearchPost post={post}/>
                            )}
                            {!tagFilter && (
                                <SearchPost post={post}/>
                            )}
                            
                        </div>
                        ))
                        
                    }
                    {display == "posts" && postData && postData.length == 0 && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p className="text-center text-7xl sm:text-9xl">No posts found</p>
                        </div>
                    )}
                    {display == "users" && !userData && !noQuery && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p className="text-center text-7xl sm:text-9xl">No users found</p>
                        </div>
                    )}




                    </div>

                </div>
                {isLoading == false && userData == null && noQuery == false && postData == null && (
                    <div className="h-[30vh] flex items-center justify-center ">
                        <div className="flex items-center justify-center bg-[#35383d] p-10 rounded-4xl w-[50%]">
                            <p className="text-7xl break-words whitespace-normal max-w-full">No Results found for &quot;{query}&quot;</p>
                        </div>
                    </div>
                )}
                {noQuery == true && isLoading == false && (
                    <div className="h-[30vh] flex items-center justify-center ">
                        <div className="flex items-center justify-center bg-[#35383d] p-10 rounded-4xl w-[50%]">
                            <p className="text-7xl break-words whitespace-normal max-w-full">Please enter your query in the navbar</p>
                        </div>
                    </div>    
                )}
                {isLoading == true && (
                    <div className="h-[30vh] flex items-center justify-center ">
                        <div className="flex items-center justify-center p-10 rounded-4xl w-[50%]">
                           <TransparrentLoadingGif width={250} height={250}/>
                        </div>
                    </div>    
                )}
            </div>
        </>
    )
}

export default function SearchPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}