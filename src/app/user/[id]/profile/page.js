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
          
        </div>

        ) : (
          <TransparrentLoadingGif width={300} height={300} className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"/>
        )}
      </div>
    </>
  )
}