"use client";

import LoginNav from "@/components/loginnav";
import Head from "next/head";
import SearchUserProfile from "@/components/searchuserprofile"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";

function Search() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [noQuery, setNoQuery] = useState(false)
    const searchParams = useSearchParams()
    const query = searchParams.get("query")
    
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
                <div className="flex overflow-y-auto scrollbar scrollbar-thumb-white ">
                    <div className="flex flex-col space-y-5 mt-10 w-3/5 ml-[10%]">
                        {userData != null && userData.map((user) => (
                            <SearchUserProfile key={user.id} userId={user.id} username={user.username} bio={user.bio} pfp={user.profilepic}/>
                        ))}
                    </div>

                </div>
                {isLoading == false && userData == null && noQuery == false && (
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