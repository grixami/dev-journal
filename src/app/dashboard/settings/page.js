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

    const [discohookColorErrorMsg, setDiscohookColorErrorMsg] = useState("")
    const [discohookColorSucessMsg, setDiscohookColorSucessMsg] = useState("")

    const [allowQuestionErrorMsg, setAllowQuestionErrorMsg] = useState("")
    const [allowQuestionSucessMsg, setAllowQuestionSucessMsg] = useState("")


    const handlePasswordSubmit = async (e) => {
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

    const handleDiscohookSubmit = async () => {
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


    const handleDiscordWebhookColorSubmit = async () => {
        setDiscohookColorSucessMsg("")
        setDiscohookColorErrorMsg("")
        const colorElement = document.getElementById("webhookcolor")
        const color = hextToDiscord(colorElement.value)
        
        const resp = await fetch("/api/user/updatewebhookcolor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                color: color
            })
        })

        if(resp.status != 200) {
            const json = await resp.json()
            setDiscohookColorErrorMsg(json.message)
            if(resp.status == 429) {
                setDiscohookColorErrorMsg("You have been ratelimited")
            }
            return
        }

        setDiscohookColorSucessMsg("sucess")
    }

    const hextToDiscord = (color) => { // discord colors are an int, not hex code
        return parseInt(color.replace("#" , ""), 16)
    }

    const handleAllowQuestionsSubmit = async () => {
        setAllowQuestionErrorMsg("")
        setAllowQuestionSucessMsg("")

        const checkedElement = document.getElementById("allowquestion")
        const checkedBool = checkedElement.checked
        const checked = checkedBool ? 1 : 0
        const resp = await fetch("/api/user/updatequestionstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                allowQuestions: checked
            })
        })

        if(resp.status != 200) {
            const respJson = await resp.json()
            setAllowQuestionErrorMsg(respJson.message)
            if(resp.status == 429) {
                setAllowQuestionErrorMsg("You have been rate limited")
            }
        } else{
            setAllowQuestionSucessMsg("sucess")
        }
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
                <div className="flex flex-col justify-center items-center sm:w-11/12 md:w-3/4 lg:w-2/5 border py-10 rounded-2xl">
                    <h1 className="text-center text-3xl border-2 p-3 rounded-3xl">Settings</h1>
                    <div>
                        <div className="flex flex-col space-y-2 items-center justify-center p-4 border-2 rounded-xl mt-5">
                            <p>New Password</p>
                            <div className="flex sm:flex-row flex-col">
                                <input ref={passRef} type="password" placeholder="xxxxxxxx" className="border rounded-xl focus:border-[#5a9ef9] focus:outline-none px-0 sm:px-3 py-1 mt-2"></input>
                                <button id="submit" className="bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                                onClick={() => handlePasswordSubmit}
                                >Update</button>
                            </div>
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

                    <div className="w-4/5 mt-5 items-center justify-center flex">
                        <div className="flex flex-col space-y-2 items-center justify-center p-4 border-2 rounded-xl my-2">
                            <p className="mt-5 text-left">Discord webhook - sends messages on post edits and uploading posts</p>
                            <textarea id="discohook" className="w-4/5 border-2 resize-none rounded-2xl focus:outline-none p-2 focus:border-[#5a9ef9]"
                            placeholder="https://discord.com/api/webhooks/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"></textarea>
                            <button className="bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                            onClick={() => handleDiscohookSubmit()}>Submit webhook</button>

                        </div>
                        {discohookErrorMsg.length > 0 && (
                            <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>Error: {discohookErrorMsg}</p>
                            </div>
                        )}
                        {discohookSucessMsg.length > 0 && (
                            <div className="bg-green-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>{discohookSucessMsg}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-4/5 mt-10">
                        <div className="flex flex-col space-y-2 items-center justify-center p-4 border-2 rounded-xl my-2">
                            <p>Discord Webhook Embed Color</p>
                            <input className="my-2 scale-200 transition-transform duration-300 hover:scale-230 hover:cursor-pointer" id="webhookcolor" type="color"></input>
                            <br></br>
                            <button className="inline-flex bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                            onClick={() => handleDiscordWebhookColorSubmit()}>Submit webhook color</button>
                        </div>
                        {discohookColorErrorMsg.length > 0 && (
                            <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>Error: {discohookColorErrorMsg}</p>
                            </div>
                        )}
                        {discohookColorSucessMsg.length > 0 && (
                            <div className="bg-green-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>{discohookColorSucessMsg}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-4/5 my-10">
                        <div className="flex flex-col space-y-2 items-center justify-center p-4 border-2 rounded-xl my-2">
                            <div className="flex items-center space-x-3">
                                <input id="allowquestion" type="checkbox" className="scale-175 w-4 h-4 bg-gray-100 border-gray-300 rounded-sm "></input>
                                <p>Allow Questions</p>
                            </div>
                            <br></br>
                            <button className="inline-flex bg-[#3d444d] mx-3 px-15 py-1 rounded-xl outline hover:bg-[#2c3036] hover:cursor-pointer"
                            onClick={() => handleAllowQuestionsSubmit()}>Submit Question Availability</button>
                        </div>
                        {allowQuestionErrorMsg.length > 0 && (
                            <div className="bg-red-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>Error: {allowQuestionErrorMsg}</p>
                            </div>
                        )}
                        {allowQuestionSucessMsg.length > 0 && (
                            <div className="bg-green-500 mt-3 px-3 py-3 rounded-2xl border inline-flex">
                                <p>{allowQuestionSucessMsg}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-5 transition-transform duration-300 hover:scale-105">
                        <a className="bg-red-600 p-2 text-2xl rounded-2xl border-2 hover:bg-red-800 " href="/auth/logout">Logout</a>
                    </div>
                </div>
            </div>
        </>
    );
}