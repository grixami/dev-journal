"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import Head from "next/head";
import LoginNav from "@/components/loginnav";
import ProfileCard from "@/components/profilecard";
import ProfilePost from "@/components/profilepost";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("auth_token");

        const fetchUser = async () => {

            try {
                const userResp = await fetch(`/api/user/getself?token=${token}`);

                if (!userResp.ok){
                     throw new Error("Failed to fetch user data");
                }

                const userJson = await userResp.json();
                setUserData(userJson);

                const postsResp = await fetch(`/api/user/getposts?id=${userJson.id}`);

                if (!postsResp.ok) {
                     throw new Error("Failed to fetch user posts");
                }

                const postsJson = await postsResp.json();
                setPostData(postsJson);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching user data:", error);
                //router.replace("/auth/logout");
            }
            setLoading(false)
        };

        fetchUser();
    }, [router]);

return (
    <>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
            <LoginNav/>
            {!loading ? (
            <div className="flex mt-10">
                <ProfileCard userData={userData} editProfile={true} />  {/* Shows pfp, username, bio and joinDate */}
                <div className="flex-grow"></div>
                <div className="w-1/2 mr-10">
                    <div className="border-2 border-white rounded-xl px-5 py-5">
                        <h2 className="text-4xl text-center">Posts</h2>
                    </div>
                    
                    {postData.length > 0 && postData.map((post) => (
                        <ProfilePost
                        key={post.id}
                        postTitle={post.title}
                        postDesc={post.desc}
                        postId={post.id}
                        canedit={true}
                        />
                    ))}
                </div>
            </div>
            ) : (
                <TransparrentLoadingGif width={300} height={300} className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"/>
            )}
            
        </div>
    </>
    );
}