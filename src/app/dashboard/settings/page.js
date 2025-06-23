"use client";

import Head from "next/head";
import LoginNav from "@/components/loginnav";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cookieExists, getCookie } from "@/utils/cookies";

export default function Settings() {
    const router = useRouter();
    const passRef = useRef();
    const [errorBox, setErrorBox] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if(!cookieExists("auth_token")) {
            router.replace("/")
        }
    }, [router])

    let handlePasswordSubmit = async (e) => {
        const resp = await fetch("/api/user/updatepassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: passRef.current.value,
                token: getCookie("auth_token")
            })
        });

        if(resp.status == 200) {
            router.replace("/dashboard")
            return
        }

        const data = await resp.json();
        setErrorBox(true)
        setErrorMsg(data.message)
    }

    return(
        <>
            <Head>
                <title>dev-jornal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LoginNav/>
            <div className="flex justify-center items-center my-10">
                <div className="flex flex-col justify-center items-center w-2/5 border py-10 rounded-2xl">
                    <div>
                        <h1 className="text-center">Settings</h1>
                        <p>New Password</p>
                        <input ref={passRef} type="password" className="border rounded-xl focus:border-[#5a9ef9] focus:outline-none px-3 py-1 mt-2"></input>
                        <button id="submit" className="bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036]"
                        onClick={handlePasswordSubmit}
                        >Update</button>

                    </div>
                    {errorBox && (
                    <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border">
                        <p>{errorMsg}</p>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}