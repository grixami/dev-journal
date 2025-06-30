"use client";

import { useState, useEffect } from "react"
import Head from "next/head"
import NotLoginNav from "@/components/notloginnav"
import { useRouter } from "next/navigation";
import { cookieExists } from "@/utils/cookies";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";

export default function ResetPassword() {

    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState("")
    const [loadingSend, setLoadingSend] = useState(false)
    const [validSend, setValidSent] = useState(false)

    useEffect(() => {
      if(cookieExists("auth_token")) {
          router.replace("/");
      }
    }, [router]);

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const sendResetLink = async () => {
        setValidSent(false)
        setLoadingSend(true)
        setErrorMsg("")
        const emailElement = document.getElementById("email")
        const email = emailElement.value

        if(!isValidEmail(email)) {
            setErrorMsg("Invalid email")
            setLoadingSend(false)
            return
        }

        const resp = await fetch("/api/auth/sendresetlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })

        if(resp.status != 200) {
            const data = await resp.json()
            setErrorMsg(data?.message)
            setLoadingSend(false)
            if(resp.status == 429) {
                setErrorMsg("Error: you have been rate limited, try again in 60s")
            }
            return
        }

        setLoadingSend(false)
        setValidSent(true)
        setErrorMsg("")
    }

    return (
        <>
            <Head>
                <title>dev-jornal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="min-h-screen flex flex-col">
                <NotLoginNav/>
                <div className="flex items-center justify-center">
                    <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d] my-60">
                        <h1 className="md:text-5xl text-3xl">Reset password</h1>
                        <div className="mt-10">
                            <p className="text-2xl">email</p>
                            <input type="email" id="email" className="p-1 flex border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9] rounded"></input>

                            {!loadingSend ? (
                            <button className="mt-3 bg-black border-2 p-2 rounded-3xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                            onClick={() => sendResetLink()}>Send reset link</button>
                            ) : (
                                <TransparrentLoadingGif/>
                            )}

                        </div>

                        {errorMsg.length > 0 && (
                            <div className="bg-red-500 p-2 rounded-3xl border-2 mt-3">
                                <p>Error: {errorMsg}</p>
                            </div>
                        )}

                        {validSend && (
                            <div className="bg-green-600 p-2 rounded-3xl border-2 mt-3">
                                <p>Sucess</p>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </>
    )
}