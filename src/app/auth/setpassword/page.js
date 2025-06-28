"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { cookieExists } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import NotLoginNav from "@/components/notloginnav";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";

function SetPassword() {
    const searchParams = useSearchParams()
    const code = searchParams.get("code")

    const [errorMsg, setErrorMsg] = useState("")
    const [sucess, setSucess] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if(cookieExists("auth_code")) {
            router.replace("/dashboard")
            return
        }
    }, [router, code])

    const resetpassowrd = async () => {
        setErrorMsg("")
        setSucess(false)
        setLoading(true)
        const passwordElement = document.getElementById("password")
        const passwordText =  passwordElement.value
        
        const resp = await fetch("/api/auth/checkresetlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                password: passwordText
            })
        })
        if(resp.status != 200) {
            const data = await resp.json()
            setErrorMsg(data.message)
            if(resp.status == 429) {
                setErrorMsg("You are being ratelimited")
            }
            setLoading(false)
            return
        }
        setLoading(false)
        setSucess(true)
        setErrorMsg("")
    }

    return (
    <>
        <Head>
            <title>dev-jornal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
            <NotLoginNav/>
            <div className="min-h-screen flex flex-col">
                <div className="flex items-center justify-center">
                    {!sucess ? (
                    <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d] my-60">
                        
                        <h1 className="text-5xl">Set new password</h1>
                        <div className="mt-10">
                            <p>New Password</p>
                            <input type="password" id="password" className="p-1 flex border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9] rounded"></input>
                        </div>
                        {!loading ? (
                        <button className="mt-3 bg-black p-2 rounded-3xl border-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                        onClick={() => resetpassowrd()}>
                            <p>Reset Password</p>
                        </button>
                        ) : (
                            <TransparrentLoadingGif/>
                        )}

                        {errorMsg.length > 0 && (
                            <div className="bg-red-500 border-2 p-2 mt-2 rounded-3xl">
                                <p>Error: {errorMsg}</p>
                            </div>
                        )}
                    </div>
                    ) : (
                        <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d] my-60">
                            <div className="bg-green-500 p-2 rounded-3xl border-2">
                                <p>Sucess, please login</p>
                            </div>
                            <a className="bg-black p-2 rounded-3xl border-2 mt-2 hover:scale-105 transition-transform duration-300" href="/auth/login">Login</a>
                        </div>
                    )}
                    
                </div>
            </div>
            <p>{code}</p>
        </div>
    </>
    )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SetPassword />
    </Suspense>
  );
}