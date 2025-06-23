"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { cookieExists, getCookie } from "@/utils/cookies";
import Head from "next/head";
import LoginNav from "@/components/loginnav";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter()
    const [userData, setUserData] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [maxSize, setMaxSize] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const fileInputRef = useRef(null);
    const usernameRef = useRef();
    const bioRef = useRef();
    const [bioText, setBioText] = useState("");

    useEffect(() => {
        if (!cookieExists("auth_token")) {
            router.replace("/");
            return;
        }
        const fetchUser = async () => {
        const token = getCookie("auth_token");

            try {
                const resp = await fetch(`/api/user/getself?token=${token}`, {
                    method: "GET",
                });

                if (!resp.ok) {
                throw new Error("Failed to fetch user data");
                }

                const data = await resp.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.replace("/");
            }
        };

        fetchUser();
    }, [router]);

    let handleOverlayClick = (e) => {

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    let handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSizeInBytes = 4 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            setMaxSize(true)
            return;
        }
        setMaxSize(false)
        
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result.split(",")[1];
            setImgData(base64);
        };

        reader.readAsDataURL(file);
        console.log(imgData)
    };

    let handleSubmit = async (e) => {
        const username = usernameRef.current.value;
        const bio = bioRef.current.value;

        const resp = await fetch("/api/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                bio: bio,
                pfp: imgData,
                token: getCookie("auth_token")
            }),
        });

        if(resp.status == 200) {
            router.replace("/dashboard")
            return
        }
        setErrorBox(true)
        const data = await resp.json()
        setErrorMsg(data.message)
    }
    return (
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LoginNav/>
            <div className="flex justify-center items-center my-10">
                <div className="flex flex-col justify-center items-center w-2/5 border py-10 rounded-2xl">
                    <div className="relative group">
                        {imgData ? (
                            <Image
                                className="border-2 border-white rounded-full"
                                src={`data:image/png;base64,${imgData}`}
                                alt="profile"
                                width={200}
                                height={200}
                            />
                        ) : userData?.profilepic ? (
                            <Image
                                className="border-2 border-white rounded-full"
                                src={`data:image/png;base64,${userData.profilepic}`}
                                alt="profile"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <Image
                                className="border-2 border-white rounded-full"
                                src="/assets/img/defaultprofile.png"
                                alt="default profile"
                                width={200}
                                height={200}
                            />
                        )}
                        <div className="absolute inset-0 rounded-full bg-black/70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity border-5 border-black" onClick={handleOverlayClick}>
                            <Image
                                src="/assets/img/cameraicon.png"
                                className="cursor-pointer"
                                alt="Overlay Icon"
                                width={150}
                                height={150}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".png,.jpg,.jpeg,.webp"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    {maxSize && (
                        <div className="bg-red-500 mt-10 px-10 py-3 rounded-2xl">
                            <p>Error, max image size must be less than 4mb</p>
                        </div>
                    )}
                    <div className="mt-10">
                        <p>Username</p>
                        <input type="text" ref={usernameRef} className="border border-white focus:border-[#5a9ef9] focus:outline-none px-3 py-1 rounded-xl" placeholder="username..." defaultValue={userData?.username}></input>
                    </div>
                    <div className="mt-5">
                        <p>Bio - {bioText.length}/256</p>
                        <textarea id="biotextarea" maxLength="256" ref={bioRef} className="border border-white focus:border-[#5a9ef9] focus:outline-none px-3 py-1 rounded-xl w-100 h-40 overflow-hidden resize-none" placeholder="bio..." defaultValue={userData?.bio}
                        onChange={(e) => {
                            setBioText(e.target.value);
                        }}></textarea>
                    </div>
                    {errorBox && (
                        <div className="bg-red-600 rounded-xl px-3 py-3 border">
                            <p>{errorMsg}</p>
                        </div>
                    )}
                    <div className="mt-5">
                        <button id="submit" className="bg-[#3d444d] px-15 py-1 rounded-xl outline hover:bg-[#2c3036]"
                        onClick={handleSubmit}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}