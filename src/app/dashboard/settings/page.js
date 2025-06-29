"use client";

import Head from "next/head";
import LoginNav from "@/components/loginnav";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";

export default function Settings() {
    const router = useRouter();
    const passRef = useRef();

    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [passwordSucessMsg, setPasswordSucessMsg] = useState("")

    const [discohookErrorMsg, setDiscohookErrorMsg] = useState("")
    const [discohookSucessMsg, setDiscohookSucessMsg] = useState("")

    let handlePasswordSubmit = async (e) => {
        setPasswordErrorMsg("")
        setPasswordSucessMsg("")
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
            setPasswordSucessMsg("sucessfuly changed password")
            return
        }
        if(resp.status == 429) {
            setPasswordErrorMsg("You have been ratelimited")
            return
        }

        const data = await resp.json();
        setPasswordErrorMsg(data.message)
        

    }

    let handleDiscohookSubmit = async () => {
        setDiscohookErrorMsg("")
        setDiscohookSucessMsg("")
        const discohookElement = document.getElementById("discohook")
        const discohook = discohookElement.value
        if(!testDiscoHook(discohook)) {
           setDiscohookErrorMsg("Discord webhook is invalid")
           return
        }
  
        const resp = await fetch("/api/user/updatewebhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                discohook: discohook
            })
        })

        if(resp.status == 200) {
            setDiscohookSucessMsg("sucessfuly changed discord webhook")
            return
        }
        if(resp.status == 429) {
            setDiscohookErrorMsg("You have been ratelimited")
            return
        }
        const data = await resp.json();
        setDiscohookErrorMsg(data.message)

    }

    let testDiscoHook = (discohook) => {
        const discohookregex = /^https:\/\/(?:discord\.com|discordapp\.com)\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+$/
        return discohookregex.test(discohook)
    }

    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LoginNav/>
            <div className="flex justify-center items-center my-10">
                <div className="flex flex-col justify-center items-center w-2/5 border py-10 rounded-2xl">
                    <h1 className="text-center text-3xl border-2 p-2 rounded-3xl">Settings</h1>
                    <div>
                        <div>
                        <p className="mt-5">New Password</p>
                        <input ref={passRef} type="password" className="border rounded-xl focus:border-[#5a9ef9] focus:outline-none px-3 py-1 mt-2"></input>
                        <button id="submit" className="bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                        onClick={handlePasswordSubmit}
                        >Update</button>

                        </div>
                        {passwordErrorMsg.length > 0 && (
                        <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border">
                            <p>{passwordErrorMsg}</p>
                        </div>
                        )}
                        {passwordSucessMsg.length > 0 && (
                        <div className="bg-green-500 mt-3 px-3 py-3 rounded-2xl border">
                            <p>{passwordSucessMsg}</p>
                        </div>
                        )}
                    </div>

                    <div className="w-full ml-20">
                        <div>
                            <p className="mt-5 text-c">Discord webhook - sends messages on post edits and uploading posts</p>
                            <textarea id="discohook" className="w-4/5 border-2 resize-none rounded-2xl focus:outline-none p-2 focus:border-[#5a9ef9]"
                            placeholder="https://discord.com/api/webhooks/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"></textarea>
                            <button className="bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                            onClick={() => handleDiscohookSubmit()}>Submit webhook</button>

                        </div>
                        {discohookErrorMsg.length > 0 && (
                            <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>{discohookErrorMsg}</p>
                            </div>
                        )}
                        {discohookSucessMsg.length > 0 && (
                            <div className="bg-green-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>{discohookSucessMsg}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}