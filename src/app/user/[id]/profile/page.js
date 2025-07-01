"use client";

import LoginNav from '@/components/loginnav';
import ProfileCard from '@/components/profilecard';
import ProfilePost from '@/components/profilepost';
import Head from 'next/head';
import { use, React } from 'react';
import { useState, useEffect } from 'react';
import TransparrentLoadingGif from '@/components/gif/transparrentloadinggif';
import { cookieExists, getCookie } from '@/utils/cookies';

export default function Page({ params }) {
  const { id } = use(params)
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false)
  const [currentLocation, setCurrentLocation ] = useState("")
  const [messagePannel, setMessagePannel] = useState(false)

  const [sentQuestionLoading, setSentQuestionLoading] = useState(false)
  const [sentQuestionErrMsg, setSentQuestionErrMsg] = useState("")
  const [sentQuestionSucessMsg, setSentQuestionSucessMsg] = useState("")

  const toggleMessagePanel = () => {
    setMessagePannel(!messagePannel)
    setSentQuestionErrMsg("")
    setSentQuestionSucessMsg("")
  }

    useEffect(() => {
      setCurrentLocation(window.location)
      const fetchUser = async () => {
      try {
          const userResp = await fetch(`/api/user/getuser?id=${id}`);

          if (!userResp.ok){
                throw new Error("Failed to fetch user data");
          }
          
          const userJson = await userResp.json();
          setUserData(userJson);

          const postsResp = await fetch(`/api/user/getposts?id=${id}`);

          if (!postsResp.ok) {
                throw new Error("Failed to fetch user posts");
          }

          const postsJson = await postsResp.json();
          setPostData(postsJson);

          if(cookieExists("auth_token")) {
            
              const followingResp = await fetch(`/api/follow/isfollowing?token=${getCookie("auth_token")}&userId=${userJson.id}`)
              const followingJson = await followingResp.json();

              setIsFollowing(followingJson.isFollowing)
              
          }

          
      } catch (error) {
        
      }
      setLoading(false)
    };

    fetchUser();
  }, [id]);

  const sendMessage = async () => {
    setSentQuestionLoading(true)
    setSentQuestionErrMsg("")
    setSentQuestionSucessMsg("")
    const contentElement = document.getElementById("messagetextbox")
    const content = contentElement.value

    const resp = await fetch("/api/questions/sendquestion", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        token: getCookie("auth_token"),
        reciverId: id,
        content: content
      })
    })

    if(resp.status != 200) {
      const data = await resp.json()
      setSentQuestionErrMsg(data.message)

      if(resp.status == 429) {
        setSentQuestionErrMsg("You are being ratelimited")
      }
      
    } else {
      setSentQuestionSucessMsg("sucess")
    }

    setSentQuestionLoading(false)
  }

  return (
    <>
      <Head>
        <title>dev-journal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={userData?.username}></meta>
        <meta property="og:url" content={currentLocation}></meta>
        <meta property="og:description" content={userData?.bio}></meta>
      </Head>
      <div>
        <LoginNav/>
        {!loading ? (
        <div>
          {userData != null ? (
          <div className="flex flex-col md:flex-row mt-10">
          <ProfileCard userData={userData} editProfile={false} isFollowing={isFollowing} />  {/* Shows pfp, username, bio and joinDate */}
          <div className="flex-grow"></div>
          <div className="md:w-1/2 w-4/5 my-10 md:my-0 md:mr-10 mx-auto">
              <div className="border-2 border-white rounded-xl px-5 py-5">
                  <h2 className="text-4xl text-center">Posts</h2>
              </div>
              {postData.length > 0 && postData.map((post) => (
                <ProfilePost
                key={post.id}
                postTitle={post.title}
                postDesc={post.desc}
                postId={post.id}
                />
              ))}
          </div>
      </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p className="text-9xl text-center">User does not exist</p>
            </div>
          )}
      {userData.allowquestions && (
      <div className="flex items-center justify-center mt-0 md:mt-[10vh] bor">
          <button className="text-4xl border-2 p-2 rounded-3xl transition-transform duration-200 hover:-translate-y-1 hover:bg-[#3d444d] hover:cursor-pointer"
          onClick={() => toggleMessagePanel()}>Send Question</button>
      </div>
      )}
      {messagePannel && (
      <div className="fixed inset-0 z-50 bg-[#010409]/30 backdrop-blur-xs flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-3xl w-[90%] sm:w-[50%]">
            <h1 className="md:text-4xl text-2xl flex items-center justify-center text-center">Send a question</h1>
            <div className="flex items-center justify-center text-center pt-3">
              <textarea id="messagetextbox" className="resize-none border-2 focus:border-[#5a9ef9] focus:outline-none rounded-2xl p-2 w-[90%]"rows={10}></textarea>
            </div>
            <div className="flex items-center justify-center text-center pt-3">
              {!sentQuestionLoading ? (
                  <div className="space-x-5">
                    <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer"
                    onClick={() => toggleMessagePanel()}>Close</button>
                    <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer"
                    onClick={() => sendMessage()}>Send</button>
                  </div>
              ) : (
                <TransparrentLoadingGif width={50} heigh={50}/>
              )}
            </div>
            {sentQuestionErrMsg.length > 0 && (
            <div className="flex items-center justify-center mt-5">
              <div className="bg-red-600 p-3 rounded-2xl border-2">
                <p>Error {sentQuestionErrMsg}</p>
              </div>
            </div>
            )}

            {sentQuestionSucessMsg.length > 0 && (
            <div className="flex items-center justify-center mt-5">
              <div className="bg-green-600 p-3 rounded-2xl border-2">
                <p>{sentQuestionSucessMsg}</p>
              </div>
            </div>
            )}

        </div>
      </div>
      )}



      </div>
      

        ) : (
          <TransparrentLoadingGif width={300} height={300} className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"/>
        )}
      </div>
    </>
  )
}